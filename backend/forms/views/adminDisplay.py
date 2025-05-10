# students/views.py
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import ListAPIView
from forms.models import Student
from forms.serializers import StudentSerializer

class AdminStudentListView(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUser]
