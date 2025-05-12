from django.db import models
from .student import Student
from .submission import Submission
from forms.utils.helperFunctions import check_required_fields
from django.core.exceptions import ValidationError

class GuidanceSpecialistNotes(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE, to_field='student_number', related_name='guidance_notes')
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    notes = models.TextField(verbose_name="Guidance Services Specialist Notes", null=True, blank=True)
    specialist = models.ForeignKey('users.CustomUser', on_delete=models.SET_NULL, null=True, limit_choices_to={'is_staff': True})
    is_confidential = models.BooleanField(default=True, help_text="If checked, only guidance specialists can view this note")
    date_added = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'guidance_specialist_notes'
        ordering = ['-date_added']
        verbose_name = "Guidance Specialist Note"
        verbose_name_plural = "Guidance Specialist Notes"

    def clean(self):
        """
        Custom validation to enforce required fields based on submission status.
        """
        if self.submission.status == 'draft':
            return

        elif self.submission.status == 'submitted':
            required_fields = {
                'student': 'required',
                'notes': 'required',
                'specialist': 'required'
            }

            check_required_fields(self, required_fields, self.submission.status)

    def __str__(self):
        return f"Guidance Notes - {self.student.first_name} {self.student.last_name} - {self.date_added.date()}"
    
    
