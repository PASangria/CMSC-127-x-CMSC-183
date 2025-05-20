from django.db import models
from django.core.exceptions import ValidationError
from .student import Student
from .enums import SemesterEnum
import re
from .submission import Submission
from forms.utils.helperFunctions import check_required_fields

class Graduation(models.Model):
    academic_year = models.CharField(
        max_length=9,
        help_text="Format: YYYY-YYYY (e.g., 2023-2024)"
    )
    semester = models.CharField(
        max_length=15,
        choices=SemesterEnum.choices
    )
    graduation_date = models.DateField()

    def clean(self):
        if not re.match(r"^20\d{2}-20\d{2}$", self.academic_year):
            raise ValidationError({
                'academic_year': "Format must be YYYY-YYYY using years from 2000 onward (e.g., 2023-2024)."
            })

        start_year, end_year = map(int, self.academic_year.split('-'))
        if end_year != start_year + 1:
            raise ValidationError({
                'academic_year': "The second year must be the first year plus one (e.g., 2023-2024)."
            })

    def __str__(self):
        return f"{self.academic_year} - {self.semester}"

class GraduateStudent(models.Model):
    graduation = models.ForeignKey('Graduation', on_delete=models.CASCADE)
    student_number = models.OneToOneField('Student', to_field='student_number', on_delete=models.CASCADE)
    honors_received = models.TextField(blank=True, null=True)
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)

    class Meta:
        db_table = "graduate_student"

    def clean(self):
        """
        Custom validation to enforce required fields based on submission status.
        """
        if self.submission.status == 'draft':
            return
        elif self.submission.status == 'submitted':
            required_fields = {
                'graduation': 'required',
                'student_number': 'required'
            }
            check_required_fields(self, required_fields, self.submission.status)

    def __str__(self):
        return f"Graduate: {self.student.first_name} {self.student.last_name} - Graduation Year: {self.graduation.year}"

    def has_honors(self):
        """Check if the student has honors."""
        return bool(self.honors_received)

    graduation = models.ForeignKey(Graduation, on_delete=models.CASCADE)
    student_number = models.OneToOneField('Student', to_field='student_number', on_delete=models.CASCADE)
    honors_received = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "graduate_student"

    def __str__(self):
        return f"Graduate: {self.student.student_number} - {self.graduation}"