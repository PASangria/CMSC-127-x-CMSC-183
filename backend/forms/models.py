from django.db import models
from django.conf import settings

class PhoneNumber(models.Model):
    PHONE_TYPE_CHOICES = [
        ('Mobile', 'Mobile'),
        ('Landline', 'Landline'),
    ]
    
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    phone_type = models.CharField(max_length=10, choices=PHONE_TYPE_CHOICES)
    phone_number = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.phone_type}: {self.phone_number}"

class Address(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    house_number = models.CharField(max_length=50)
    street = models.CharField(max_length=255)
    barangay = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    municipality = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.house_number} {self.street}, {self.city}, {self.zip_code}"

class AddressLog(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    address_type = models.CharField(max_length=10, choices=[('Permanent', 'Permanent'), ('Present', 'Present')])
    timestamp = models.DateTimeField(auto_now_add=True)  
    
    def __str__(self):
        return f"{self.address_type} - {self.address}"

class Student(models.Model):
    SEX_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]

    COLLEGE_CHOICES = [
        ('College of Humanities and Social Sciences', 'CHSS'),
        ('College of Science and Mathematics', 'CSM'),
        ('School of Management', 'SOM'),
        
    ]

    YEAR_LEVEL_CHOICES = [
        (1, 'First Year'),
        (2, 'Second Year'),
        (3, 'Third Year'),
        (4, 'Fourth Year'),
        (5, 'Fifth Year'),
    ]

    DEGREE_PROGRAM_CHOICES = [
        ('BSCS', 'Bachelor of Science in Computer Science'),
        ('BSEE', 'Bachelor of Science in Electrical Engineering'),
        # Add more...
    ]

    student_number = models.CharField(max_length=10, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    family_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    nickname = models.CharField(max_length=50, blank=True, null=True)
    sex = models.CharField(max_length=6, choices=SEX_CHOICES)
    religion = models.CharField(max_length=100, blank=True, null=True)
    birth_rank = models.PositiveIntegerField()
    birthdate = models.DateField()
    birth_place = models.CharField(max_length=200)
    permanent_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True)
    college = models.CharField(max_length=100, choices=COLLEGE_CHOICES)
    current_year_level = models.IntegerField(choices=YEAR_LEVEL_CHOICES)
    degree_program = models.CharField(max_length=100, choices=DEGREE_PROGRAM_CHOICES)

    def __str__(self):
        return f"{self.student_number} - {self.first_name} {self.family_name}"
