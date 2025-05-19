from django.contrib.postgres.fields import ArrayField
from django.db import models
from .student import Student
from django.core.exceptions import ValidationError
from .submission import Submission
from forms.utils.helperFunctions import check_required_fields

class HealthData(models.Model):
    student_number = models.ForeignKey('Student', to_field='student_number', on_delete=models.CASCADE)
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    health_condition = models.CharField(null=True, blank=True, max_length=20, choices=[('Excellent', 'Excellent'), ('Very Good', 'Very Good'), ('Good', 'Good'), ('Poor', 'Poor')])
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    eye_sight = models.CharField(null=True, blank=True, max_length=20, choices=[('Good', 'Good'), ('Medium', 'Medium'), ('Poor', 'Poor')])
    hearing = models.CharField(null=True, blank=True, max_length=20, choices=[('Good', 'Good'), ('Medium', 'Medium'), ('Poor', 'Poor')])
    physical_disabilities = ArrayField(models.CharField(max_length=50), null=True, blank=True)
    common_ailments = ArrayField(models.CharField(max_length=50), null=True, blank=True)
    last_hospitalization = models.CharField(max_length=255, null=True, blank=True)
    reason_of_hospitalization = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'health_data'

    def clean(self):
        """
        Custom validation to enforce required fields based on submission status.
        """
        if self.submission.status == 'draft':
            return

        elif self.submission.status == 'submitted':
            required_fields = {
                'student_number': 'required',
                'health_condition': 'required',
                'height': 'required',
                'weight': 'required',
                'eye_sight': 'required',
                'hearing': 'required'
            }

            check_required_fields(self, required_fields, self.submission.status)

            if self.last_hospitalization and not self.reason_of_hospitalization:
                raise ValidationError({
                    'reason_of_hospitalization': 'Reason for hospitalization is required if there was a hospitalization.'
                })

    def __str__(self):
        return f"Health Data for {self.student_number}"

