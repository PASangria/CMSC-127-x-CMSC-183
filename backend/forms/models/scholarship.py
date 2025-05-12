from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.core.exceptions import ValidationError
from .student import Student
from .submission import Submission

class Scholarship(models.Model):
    student = models.ForeignKey('Student', to_field='student_number', on_delete=models.CASCADE)
    scholarships_and_assistance = ArrayField(models.CharField(max_length=255), null=True, blank=True)
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Scholarship"
        verbose_name_plural = "Scholarships"

    def clean(self):
        """
        Custom validation to handle draft and submitted status without making fields required.
        """
        if self.submission.status == 'draft':
            return
        elif self.submission.status == 'submitted':
            return

    def __str__(self):
        return f'Scholarships for {self.student.student_number}'
