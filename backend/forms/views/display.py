# forms/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from forms.models import Submission
from forms.serializers import SubmissionSerializer

class SubmissionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Submission.objects.all()  
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Restricts the returned submissions to the current logged-in user.
        """
        student = self.request.user.student  
        return Submission.objects.filter(student=student) 
