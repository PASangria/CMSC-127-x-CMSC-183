from django.db import models
from .enums import PhilippineRegionEnum
from .student import Student
from django.core.exceptions import ValidationError

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
    address = models.ForeignKey(SchoolAddress, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class PreviousSchoolRecord(models.Model):
    student_number = models.ForeignKey('Student', on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    education_level = models.CharField(
        max_length=50,
        choices=[('Primary', 'Primary'), ('Junior High', 'Junior High'), 
                 ('Senior High', 'Senior High'), ('College', 'College')]
    )
    start_year = models.IntegerField()
    end_year = models.IntegerField()
    honors_received = models.TextField(blank=True, null=True)
    senior_high_gpa = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.school.name} - {self.education_level} ({self.start_year}-{self.end_year})"
    
    # Custom validation: Ensure GPA is only set for Senior High
    def clean(self):
        if self.education_level == 'Senior High' and not self.senior_high_gpa:
            raise ValidationError('Senior High GPA is required for Senior High education level.')
        super().clean()

