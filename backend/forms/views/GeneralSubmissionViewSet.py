from rest_framework import viewsets, status
from rest_framework.response import Response
from forms.models import Submission, PrivacyConsent
from forms.serializers import (
    SubmissionSerializer,
    PrivacyConsentSerializer,
)
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from forms.map import FORM_SECTIONS_MAP, FORM_TYPE_SLUG_MAP, FORM_TYPE_UNSLUG_MAP


class PrivacyConsentViewSet(viewsets.ModelViewSet):
    queryset = PrivacyConsent.objects.all()
    serializer_class = PrivacyConsentSerializer


class DraftSubmissionMixin:
    def perform_create(self, serializer):
        instance = serializer.save()
        self._conditionally_validate_and_update_submission(instance)

    def perform_update(self, serializer):
        instance = serializer.save()
        self._conditionally_validate_and_update_submission(instance)

    def _conditionally_validate_and_update_submission(self, instance):
        submission = instance.submission
        submission.saved_on = timezone.now()

        if submission.status == 'submitted':
            instance.full_clean()
            submission.submitted_on = timezone.now()

        submission.save()
        instance.save()


class FormBundleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, form_type):
        student = request.user.student
        sections = FORM_SECTIONS_MAP.get(form_type)
        form_type_display = FORM_TYPE_SLUG_MAP.get(form_type)

        if not sections:
            return Response({'error': 'Invalid form type.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            submission = Submission.objects.select_related('student').get(student=student, form_type=form_type_display)
        except Submission.DoesNotExist:
            return Response({'error': 'No submission found for this form type.'}, status=status.HTTP_404_NOT_FOUND)

        data = {
            'submission': SubmissionSerializer(submission).data
        }

        for key, (model, serializer) in sections.items():
            # Check if the section expects multiple items
            many = model._meta.model_name in ['sibling', 'previousschoolrecord']  # Add others as needed

            if any(field.name == 'submission' for field in model._meta.fields):
                queryset = model.objects.filter(submission=submission)
            elif any(field.name == 'student' for field in model._meta.fields):
                queryset = model.objects.filter(student=student)
            else:
                queryset = model.objects.none()

            if many:
                data[key] = serializer(queryset, many=True).data
            else:
                instance = queryset.first()
                data[key] = serializer(instance).data if instance else None

        return Response(data)

    def post(self, request, form_type):
        # Map slug to display name
        form_type_display = FORM_TYPE_SLUG_MAP.get(form_type)

        if not form_type_display:
            return Response({'error': 'Invalid form type.'}, status=status.HTTP_400_BAD_REQUEST)

        student = request.user.student
        submission, created = Submission.objects.get_or_create(
            student=student,
            form_type=form_type_display,  # Save the actual display name, not the slug
            defaults={'status': 'draft'}
        )

        if not created:
            return Response({'message': 'Submission already exists.', 'submission_id': submission.id})

        submission.saved_on = timezone.now()
        submission.save()

        return Response({'message': 'Draft submission created successfully.', 'submission_id': submission.id}, status=status.HTTP_201_CREATED)

    def patch(self, request, form_type):
        form_type_display = FORM_TYPE_SLUG_MAP.get(form_type)
        student = request.user.student
        sections = FORM_SECTIONS_MAP.get(form_type)

        if not sections:
            return Response({'error': 'Invalid form type.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            submission = Submission.objects.get(student=student, form_type=form_type_display)
        except Submission.DoesNotExist:
            return Response({'error': 'No submission found for this form type.'}, status=status.HTTP_404_NOT_FOUND)

        if submission.status == 'submitted':
            return Response({'error': 'You cannot modify a submitted form.'}, status=status.HTTP_400_BAD_REQUEST)

        errors = {}
        updated_data = {}

        for key, (model, serializer_class) in sections.items():
            section_data = request.data.get(key)
            if section_data is not None:
                many = isinstance(section_data, list)

                if many:
                    existing_instances = model.objects.filter(submission=submission)

                    for item in section_data:
                        if 'submission' not in item and 'submission' in [f.name for f in model._meta.fields]:
                            item['submission'] = submission.id
                        if 'student' not in item and 'student' in [f.name for f in model._meta.fields]:
                            item['student'] = student.student_number

                    serializer = serializer_class(
                        instance=existing_instances,
                        data=section_data,
                        partial=True,
                        many=True,
                        context={'submission': submission, 'student': student}
                    )
                else:
                    instance = model.objects.filter(submission=submission).first() if 'submission' in [f.name for f in model._meta.fields] else model.objects.filter(student=student).first()

                    if 'submission' not in section_data and 'submission' in [f.name for f in model._meta.fields]:
                        section_data['submission'] = submission.id
                    if 'student' not in section_data and 'student' in [f.name for f in model._meta.fields]:
                        section_data['student'] = student.student_number

                    serializer = serializer_class(
                        instance=instance,
                        data=section_data,
                        partial=True,
                        many=False,
                        context={'submission': submission, 'student': student}
                    )

                if serializer.is_valid():
                    saved_data = serializer.save()
                    updated_data[key] = serializer.data
                else:
                    errors[key] = serializer.errors

                
        return Response({'message': 'Form data updated successfully.', 'data': updated_data}, status=status.HTTP_200_OK)

    
class FinalizeSubmissionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, submission_id):
        # Step 1: Get the Submission object
        try:
            submission = Submission.objects.get(id=submission_id)
        except Submission.DoesNotExist:
            return Response({'error': 'Submission not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Step 2: Ensure the user owns the submission
        if submission.student != request.user.student:
            return Response({'error': 'You do not have permission to submit this form.'},
                            status=status.HTTP_403_FORBIDDEN)

        # Step 3: Prevent submission if it's already finalized
        if submission.status == 'submitted':
            return Response({'message': 'Submission has already been finalized.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Step 4: Get form type and sections
        form_type_slug = FORM_TYPE_UNSLUG_MAP.get(submission.form_type)
        if not form_type_slug:
            return Response({'error': 'Invalid form type.'}, status=status.HTTP_400_BAD_REQUEST)

        sections = FORM_SECTIONS_MAP.get(form_type_slug)
        if not sections:
            return Response({'error': 'Invalid form type.'}, status=status.HTTP_400_BAD_REQUEST)

        # Step 5: Initialize error tracking
        errors = {}

        # Step 6: Validate sections
        for key, (model, _) in sections.items():
            # Prepare filter conditions for models that are related to the submission
            filter_kwargs = {}
            if any(field.name == 'submission' for field in model._meta.fields):
                filter_kwargs['submission'] = submission

            if any(field.name == 'student' for field in model._meta.fields):
                filter_kwargs['student'] = request.user.student

            # Dynamically fetch the instance
            instance = model.objects.filter(**filter_kwargs).first()

            # If we have the instance, validate it, otherwise handle missing data
            if instance:
                try:
                    instance.clean()  # Perform custom model validation (if any)
                except ValidationError as e:
                    errors[key] = e.message_dict
            else:
                errors[key] = ['Section is missing.']

        # Step 7: Return validation errors if any
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        # Step 8: Finalize the submission (mark as 'submitted')
        submission.status = 'submitted'
        submission.submitted_on = timezone.now()
        submission.save()

        return Response({'message': 'Submission finalized successfully.'}, status=status.HTTP_200_OK)