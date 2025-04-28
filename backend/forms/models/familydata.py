from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from .student import Student

class Parent(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    age = models.PositiveIntegerField()
    job_occupation = models.CharField(max_length=255)
    company_agency = models.CharField(max_length=255, null=True, blank=True)
    company_address = models.TextField(null=True, blank=True)
    highest_educational_attainment = models.CharField(max_length=255)
    contact_number = PhoneNumberField()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Sibling(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    sex = models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)
    age = models.PositiveIntegerField()
    job_occupation = models.CharField(max_length=255, null=True, blank=True)
    company_school = models.CharField(max_length=255, null=True, blank=True)
    educational_attainment = models.CharField(max_length=255)
    students = models.ManyToManyField('Student', related_name='siblings')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Guardian(models.Model):
    student = models.OneToOneField('Student', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    contact_no = PhoneNumberField()
    address = models.CharField(max_length=255)
    relationship_to_guardian = models.CharField(max_length=255)
    language_dialect = models.JSONField()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class FamilyData(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name='family_data')
    mother = models.ForeignKey(Parent, null=True, blank=True, on_delete=models.SET_NULL, related_name='children_mother')
    father = models.ForeignKey(Parent, null=True, blank=True, on_delete=models.SET_NULL, related_name='children_father')
    guardian = models.ForeignKey(Guardian, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'Family Data for {self.student.first_name} {self.student.last_name}'
