# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from forms.models import Submission, Preferences, StudentSupport, SocioEconomicStatus, PresentScholasticStatus
from forms.serializers import (
    PreferencesSerializer,
    StudentSupportSerializer,
    SocioEconomicStatusSerializer,
    PresentScholasticStatusSerializer,
    SubmissionBundleSerializer
)
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from forms.map import FORM_TYPE_MAP
from django.core.exceptions import ValidationError


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


class PreferencesViewSet(DraftSubmissionMixin, viewsets.ModelViewSet):
    queryset = Preferences.objects.all()
    serializer_class = PreferencesSerializer

class StudentSupportViewSet(DraftSubmissionMixin, viewsets.ModelViewSet):
    queryset = StudentSupport.objects.all()
    serializer_class = StudentSupportSerializer

class SocioEconomicStatusViewSet(DraftSubmissionMixin, viewsets.ModelViewSet):
    queryset = SocioEconomicStatus.objects.all()
    serializer_class = SocioEconomicStatusSerializer

class PresentScholasticStatusViewSet(DraftSubmissionMixin, viewsets.ModelViewSet):
    queryset = PresentScholasticStatus.objects.all()
    serializer_class = PresentScholasticStatusSerializer

class FormBundleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, form_type):
        student = request.user.student  # assuming student is linked to user
        
        form_type_display = FORM_TYPE_MAP.get(form_type)
        if not form_type_display:
            return Response({'error': 'Invalid form type.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            submission = Submission.objects.get(student=student, form_type=form_type)
        except Submission.DoesNotExist:
            return Response({'error': 'No submission found for this form type.'}, status=status.HTTP_404_NOT_FOUND)

        data = {
            'submission': {
                'id': submission.id,
                'form_type': submission.form_type,
                'status': submission.status,
                'created_at': submission.created_at,
                'saved_on': submission.saved_on,
                'submitted_on': submission.submitted_on,
                'updated_at': submission.updated_at
            },
            'preferences': None,
            'support': None,
            'socio_economic_status': None,
            'scholastic_status': None
        }

        preferences = Preferences.objects.filter(submission=submission).first()
        support = StudentSupport.objects.filter(submission=submission).first()
        socio = SocioEconomicStatus.objects.filter(submission=submission).first()
        scholastic = PresentScholasticStatus.objects.filter(submission=submission).first()

        if preferences:
            data['preferences'] = PreferencesSerializer(preferences).data
        if support:
            data['support'] = StudentSupportSerializer(support).data
        if socio:
            data['socio_economic_status'] = SocioEconomicStatusSerializer(socio).data
        if scholastic:
            data['scholastic_status'] = PresentScholasticStatusSerializer(scholastic).data

        return Response(data)

    def post(self, request, form_type):
        student = request.user.student  # assuming student is linked to user
        form_type_display = FORM_TYPE_MAP.get(form_type)
        
        if not form_type_display:
            return Response({'error': 'Invalid form type.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if submission already exists
        submission, created = Submission.objects.get_or_create(
            student=student,
            form_type=form_type,
            defaults={'status': 'draft'}
        )

        # If it exists, we will just return the existing submission
        if not created:
            return Response({'message': 'Submission already exists.', 'submission_id': submission.id})

        # Set the 'saved_on' timestamp when creating the submission
        submission.saved_on = timezone.now()
        submission.save()

        return Response({'message': 'Draft submission created successfully.', 'submission_id': submission.id}, status=status.HTTP_201_CREATED)
    
    def patch(self, request, form_type):
        student = request.user.student
        form_type_display = FORM_TYPE_MAP.get(form_type)

        if not form_type_display:
            return Response({'error': 'Invalid form type.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            submission = Submission.objects.get(student=student, form_type=form_type)
        except Submission.DoesNotExist:
            return Response({'error': 'No submission found for this form type.'}, status=status.HTTP_404_NOT_FOUND)

        errors = {}
        updated_data = {}

        if submission.status == 'submitted':
            return Response({'error': 'You cannot modify a submitted form.'}, status=status.HTTP_400_BAD_REQUEST)
    
        # Handle Preferences
        pref_data = request.data.get('preferences')
        if pref_data is not None:
            instance = Preferences.objects.filter(submission=submission).first()
            serializer = PreferencesSerializer(instance, data=pref_data, partial=True)
            if serializer.is_valid():
                serializer.save(submission=submission, student_number=student)
                updated_data['preferences'] = serializer.data
            else:
                errors['preferences'] = serializer.errors

        # Handle StudentSupport
        support_data = request.data.get('student_support')
        if support_data is not None:
            instance = StudentSupport.objects.filter(submission=submission).first()
            if instance:
                serializer = StudentSupportSerializer(instance, data=support_data, partial=True)
            else:
                serializer = StudentSupportSerializer(data=support_data)

            if serializer.is_valid():
                serializer.save(submission=submission, student_number=student)
                updated_data['student_support'] = serializer.data
            else:
                errors['student_support'] = serializer.errors
        
        # Handle SocioEconomicStatus
        socio_data = request.data.get('socio_economic_status')
        if socio_data is not None:
            instance = SocioEconomicStatus.objects.filter(submission=submission).first()
            serializer = SocioEconomicStatusSerializer(instance, data=socio_data, partial=True)
            if serializer.is_valid():
                serializer.save(submission=submission, student_number=student)
                updated_data['socio_economic_status'] = serializer.data
            else:
                errors['socio_economic_status'] = serializer.errors

        # Handle PresentScholasticStatus
        scholastic_data = request.data.get('scholastic_status')
        if scholastic_data is not None:
            instance = PresentScholasticStatus.objects.filter(submission=submission).first()
            serializer = PresentScholasticStatusSerializer(instance, data=scholastic_data, partial=True)
            if serializer.is_valid():
                serializer.save(submission=submission, student=student)
                updated_data['scholastic_status'] = serializer.data
            else:
                errors['scholastic_status'] = serializer.errors

        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Form data updated successfully.', 'data': updated_data}, status=status.HTTP_200_OK)

 
class FinalizeSubmissionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, submission_id):
        try:
            # Retrieve the submission by ID
            submission = Submission.objects.get(id=submission_id)

            # Ensure the submission is linked to the current user (student)
            if submission.student != request.user.student:
                return Response({'error': 'You do not have permission to submit this form.'},
                                 status=status.HTTP_403_FORBIDDEN)

            # Check if submission is already 'submitted'
            if submission.status == 'submitted':
                return Response({'message': 'Submission has already been finalized.'},
                                 status=status.HTTP_400_BAD_REQUEST)

            # Change the status of the submission to 'submitted'
            submission.status = 'submitted'
            submission.submitted_on = timezone.now()
            submission.save()

            errors = {}

            # Trigger validation for each related model
            try:
                preferences = Preferences.objects.get(submission=submission)
                preferences.clean()  # Call custom validation method
            except ValidationError as e:
                errors['preferences'] = e.message_dict

            try:
                student_support = StudentSupport.objects.get(submission=submission)
                student_support.clean()  # Call custom validation method
            except ValidationError as e:
                errors['student_support'] = e.message_dict

            try:
                socio_economic_status = SocioEconomicStatus.objects.get(submission=submission)
                socio_economic_status.clean()  # Call custom validation method
            except ValidationError as e:
                errors['socio_economic_status'] = e.message_dict

            try:
                scholastic_status = PresentScholasticStatus.objects.get(submission=submission)
                scholastic_status.clean()  # Call custom validation method
            except ValidationError as e:
                errors['scholastic_status'] = e.message_dict

            if errors:
                return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

            # If all validations pass, respond with success
            return Response({'message': 'Submission finalized successfully.'}, status=status.HTTP_200_OK)

        except Submission.DoesNotExist:
            return Response({'error': 'Submission not found.'}, status=status.HTTP_404_NOT_FOUND)
