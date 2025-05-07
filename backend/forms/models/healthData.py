from django.contrib.postgres.fields import ArrayField
from django.db import models
from .student import Student

class HealthData(models.Model):
    student_number = models.ForeignKey('Student',  to_field='student_number', on_delete=models.CASCADE)
    health_condition = models.CharField(max_length=20, choices=[('excellent', 'Excellent'), ('very_good', 'Very Good'), ('good', 'Good'), ('poor', 'Poor')])
    height = models.FloatField()
    weight = models.FloatField()
    eye_sight = models.CharField(max_length=20, choices=[('good', 'Good'), ('medium', 'Medium'), ('poor', 'Poor')])
    hearing = models.CharField(max_length=20, choices=[('good', 'Good'), ('medium', 'Medium'), ('poor', 'Poor')])
    physical_disabilities = ArrayField(models.CharField(max_length=50), null=True, blank=True)
    common_ailments = ArrayField(models.CharField(max_length=50), null=True, blank=True)
    last_hospitalization = models.CharField(max_length=255, null=True, blank=True)
    reason_of_hospitalization = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Health Data for {self.student}"
