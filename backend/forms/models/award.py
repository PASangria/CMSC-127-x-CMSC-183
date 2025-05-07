from django.db import models
from django.core.exceptions import ValidationError
from .student import Student
from .enums import SemesterEnum
import re

class Award(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CollegeAward(models.Model):
    student = models.ForeignKey('Student', to_field='student_number', on_delete=models.CASCADE)
    award = models.ForeignKey('Award', on_delete=models.CASCADE)
    semester = semester = models.CharField(
        max_length=10,
        choices=SemesterEnum.choices
    )  # example Enum
    academic_year = models.CharField(max_length=9, help_text="Format: YYYY-YYYY")
    position = models.CharField(max_length=255)

    def clean(self):
        # Validation for academic year format (20xx-20xx)
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
        return f"{self.student.student_number} - {self.award.name} ({self.academic_year})"
