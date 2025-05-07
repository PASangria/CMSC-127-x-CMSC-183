from django.db import models
from .student import Student

class GuidanceSpecialistNotes(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, to_field='student_number', related_name='guidance_notes')
    notes = models.TextField(verbose_name="Guidance Services Specialist Notes")
    date_added = models.DateTimeField(auto_now_add=True)
    specialist = models.ForeignKey('users.CustomUser', on_delete=models.SET_NULL, null=True, limit_choices_to={'is_staff': True})
    is_confidential = models.BooleanField(default=True, help_text="If checked, only guidance specialists can view this note")

    class Meta:
        ordering = ['-date_added']
        verbose_name = "Guidance Specialist Note"
        verbose_name_plural = "Guidance Specialist Notes"

    def __str__(self):
        return f"Guidance Notes - {self.student.first_name} {self.student.last_name} - {self.date_added.date()}" 