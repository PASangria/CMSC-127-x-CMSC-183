# students/views.py
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import ListAPIView
from forms.models import Student, Submission
from forms.serializers import StudentSerializer, AdminSubmissionDetailSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from forms.map import FORM_SECTIONS_MAP, FORM_TYPE_UNSLUG_MAP

class AdminStudentListView(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUser]

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_student_profile_by_id(request, student_id):
    try:
        student = Student.objects.get(student_number=student_id)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    

class AdminBISList(APIView):
    permission_classes = [IsAdminUser] 

    def get(self, request):
        if not request.user.is_staff:
            return Response({'error': 'Permission denied, admins only.'}, status=403)

        try:
            submissions = Submission.objects.all()  # Get all submissions
            serializer = AdminSubmissionDetailSerializer(submissions, many=True)
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        

class AdminStudentFormsView(APIView):
    def get(self, request, student_id):
        try:
            # Filter submissions by student_id
            submissions = Submission.objects.filter(student__student_number=student_id, status='submitted')

            # Serialize the data
            serializer = AdminSubmissionDetailSerializer(submissions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)