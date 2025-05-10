# students/views.py
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import ListAPIView
from forms.models import Student
from forms.serializers import StudentSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status

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