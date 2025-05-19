from rest_framework import serializers
from forms.models import Submission
from .ProfileSetupSerializers import StudentSerializer  

class AdminSubmissionDetailSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Submission
        fields = ['id', 'form_type', 'status', 'saved_on', 'submitted_on', 'student']
