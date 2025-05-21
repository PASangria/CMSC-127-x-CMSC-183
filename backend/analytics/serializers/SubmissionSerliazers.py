from rest_framework import serializers
from forms.models import Submission

class RecentSubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    student_number = serializers.CharField(source='student.student_number')

    class Meta:
        model = Submission
        fields = ['id', 'student_name', 'student_number', 'form_type', 'status', 'submitted_on']

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"