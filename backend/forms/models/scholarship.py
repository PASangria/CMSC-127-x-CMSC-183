from django.contrib.postgres.fields import ArrayField
from django.db import models
from .student import Student

class Scholarship(models.Model):
    student = models.ForeignKey('Student', to_field='student_number', on_delete=models.CASCADE)
    scholarships_and_assistance = ArrayField(models.CharField(max_length=255), null=True, blank=True)

    def __str__(self):
        return f'Scholarships for {self.student.student_number}'