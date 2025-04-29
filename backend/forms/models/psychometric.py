from django.db import models
from .student import Student

class PsychometricData(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='psychometric_data')
    testing_date = models.DateField(verbose_name="Date of Testing")
    test_name = models.CharField(max_length=100, verbose_name="Name of Test")
    raw_score = models.CharField(max_length=20, verbose_name="Raw Score")
    percentile = models.CharField(max_length=20, verbose_name="Percentile/IQ")
    classification = models.CharField(max_length=50, verbose_name="Classification")

    class Meta:
        ordering = ['-testing_date']
        verbose_name = "Psychometric Data"
        verbose_name_plural = "Psychometric Data"

    def __str__(self):
        return f"Psychometric Data - {self.student.first_name} {self.student.last_name} - {self.test_name}" 