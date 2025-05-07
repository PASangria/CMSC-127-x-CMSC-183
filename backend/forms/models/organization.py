from django.core.exceptions import ValidationError
from django.db import models
from .student import Student
from .enums import SemesterEnum
import re

class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Membership(models.Model):
    student = models.ForeignKey('Student', to_field='student_number', on_delete=models.CASCADE)
    organization = models.ForeignKey('Organization', on_delete=models.CASCADE)
    semester = models.CharField(
        max_length=10,
        choices=SemesterEnum.choices
    )
    academic_year = models.CharField(max_length=9, help_text="Format: YYYY-YYYY")
    position = models.CharField(max_length=255)

    def clean(self):
        if not re.match(r"^20\d{2}-20\d{2}$", self.academic_year):
            raise ValidationError({
                'academic_year': "Academic year must follow the format YYYY-YYYY (e.g., 2023-2024)."
            })
        start_year, end_year = map(int, self.academic_year.split('-'))
        if end_year != start_year + 1:
            raise ValidationError({
                'academic_year': "The second year must be one more than the first year (e.g., 2023-2024)."
            })

    def __str__(self):
        return f"{self.student.student_number} - {self.organization.name} ({self.academic_year})"
