import re
from django.db import models
from django.core.exceptions import ValidationError
from users.models import CustomUser
from .address import Address  
from .enums import CollegeEnum, YearLevelEnum, DegreeProgramEnum 

def validate_student_number(value):
    if not re.match(r'^\d{4}-\d{5}$', value):
        raise ValidationError('Student number must be in the format YYYY-XXXXX')

class Student(models.Model):
    student_number = models.CharField(max_length=10, unique=True, validators=[validate_student_number])
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, null=True, blank=True)
    nickname = models.CharField(max_length=50, null=True, blank=True)
    sex = models.CharField(max_length=6, choices=[('male', 'Male'), ('female', 'Female')])
    religion = models.CharField(max_length=50, null=True, blank=True)
    birth_rank = models.PositiveIntegerField()  
    birthdate = models.DateField()
    birthplace = models.CharField(max_length=50)
    permanent_address = models.ForeignKey(Address, related_name='permanent_students', on_delete=models.CASCADE)
    address_while_in_up = models.ForeignKey(Address, related_name='students_in_up', on_delete=models.CASCADE)
    college = models.CharField(max_length=10, choices=CollegeEnum.choices)
    current_year_level = models.CharField(max_length=10, choices=YearLevelEnum.choices)
    degree_program = models.CharField(max_length=50, choices=DegreeProgramEnum.choices)

    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.student_number})'
