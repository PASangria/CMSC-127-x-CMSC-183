from django.db import models
from .enums import PhilippineRegionEnum
from .student import Student
from django.core.exceptions import ValidationError
from .submission import Submission
from forms.utils.helperFunctions import check_required_fields
from datetime import datetime

class SchoolAddress(models.Model):
    address_line_1 = models.TextField()
    barangay = models.CharField(max_length=100)
    city_municipality = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    region = models.CharField(max_length=100, choices=PhilippineRegionEnum.choices)
    zip_code = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.address_line_1}, {self.barangay}, {self.city_municipality}, {self.province}, {self.region}'

# Model for School
class School(models.Model):
    name = models.CharField(max_length=255)
    address = models.ForeignKey(SchoolAddress, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name

class PreviousSchoolRecord(models.Model):
    student_number = models.ForeignKey('Student', to_field='student_number', on_delete=models.CASCADE)
    school = models.ForeignKey('School', on_delete=models.CASCADE, blank=True, null=True)
    education_level = models.CharField(
        max_length=50,
        choices=[('Primary', 'Primary'), ('Junior High', 'Junior High'), 
                 ('Senior High', 'Senior High'), ('College', 'College')], blank=True, null=True
    )
    start_year = models.IntegerField(blank=True, null=True)
    end_year = models.IntegerField(blank=True, null=True)
    honors_received = models.TextField(blank=True, null=True)
    senior_high_gpa = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)

    submission = models.ForeignKey(Submission, on_delete=models.CASCADE, db_column='submission_id') 
    
    class Meta:
        verbose_name = "Previous School Record"
        verbose_name_plural = "Previous School Records"
        ordering = ['-end_year', '-start_year']

    def __str__(self):
        return f"{self.school.name} - {self.education_level} ({self.start_year}-{self.end_year})"
    
    def clean(self):
        """
        Custom validation based on submission status (draft or submitted).
        Ensures GPA is required only for Senior High when submitted.
        Allows null and blank for draft status.
        """
        if self.submission.status == 'draft':
            return
        
        elif self.submission.status == 'submitted':
            required_fields = {
                'student_number': 'required',
                'school': 'required',
                'education_level': 'required',
                'start_year': 'required',
                'end_year': 'required'
            }
            
            check_required_fields(self, required_fields, self.submission.status)
            
            if self.education_level == 'Senior High' and not self.senior_high_gpa:
                raise ValidationError('Senior High GPA is required for Senior High education level when submitted.')

            if self.education_level != 'Senior High' and self.senior_high_gpa is not None:
                raise ValidationError('GPA should not be provided for non-Senior High education levels.')
            
            if self.end_year < self.start_year:
                raise ValidationError('End year cannot be earlier than the start year.')
            
            current_year = datetime.now().year
            
            if self.start_year > current_year or self.end_year > current_year:
                raise ValidationError('Start and end years cannot be in the future.')
            
