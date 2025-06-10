from rest_framework import serializers
from forms.models import Submission
from .ProfileSetupSerializers import StudentSummarySerializer  

class AdminSubmissionDetailSerializer(serializers.ModelSerializer):
    student = StudentSummarySerializer(read_only=True)

    class Meta:
        model = Submission
        fields = ['id', 'form_type', 'status', 'saved_on', 'submitted_on', 'student']
