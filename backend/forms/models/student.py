import re
from django.db import models
from django.core.exceptions import ValidationError
from users.models import CustomUser
from .address import Address  
from .enums import CollegeEnum, YearLevelEnum, DegreeProgramEnum 
from django.core.validators import RegexValidator

def validate_student_number(value):
    if not re.match(r'^\d{4}-\d{5}$', value):
        raise ValidationError('Student number must be in the format YYYY-XXXXX')

def get_phone_validator():
    return RegexValidator(
        regex=r'^\+?\d{9,15}$',
        message="Enter a valid phone number (9 to 15 digits, optional leading '+')."
    )

class Student(models.Model):
    # Education
    student_number = models.CharField(max_length=10, unique=True,  primary_key=True, validators=[validate_student_number])
    college = models.CharField(max_length=10, choices=CollegeEnum.choices)
    current_year_level = models.CharField(max_length=10, choices=YearLevelEnum.choices)
    degree_program = models.CharField(max_length=50, choices=DegreeProgramEnum.choices)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    
    # Personal Information
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, null=True, blank=True)
    nickname = models.CharField(max_length=50, null=True, blank=True)
    sex = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')])
    religion = models.CharField(max_length=50, null=True, blank=True)
    birth_rank = models.PositiveIntegerField()  
    birthdate = models.DateField()
    birthplace = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=15, validators=[get_phone_validator()])
    landline_number = models.CharField(max_length=15, validators=[get_phone_validator()], null=True, blank=True)
    
    # Address
    permanent_address = models.ForeignKey(Address, related_name='permanent_students', on_delete=models.CASCADE)
    
    # Adress while in UP
    address_while_in_up = models.ForeignKey(Address, related_name='students_in_up', on_delete=models.CASCADE)

    is_complete = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.student_number})'

    def save(self, *args, **kwargs):
        if self.is_complete and not self.completed_at:
            from django.utils.timezone import now
            self.completed_at = now()
        super().save(*args, **kwargs)