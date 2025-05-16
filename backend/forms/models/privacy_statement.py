from django.db import models
from .student import Student
from .submission import Submission
from forms.utils.helperFunctions import check_required_fields
from django.core.exceptions import ValidationError

class PrivacyConsent(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE, to_field='student_number', related_name='privacy_consents')
    submission = models.OneToOneField('Submission', on_delete=models.CASCADE, related_name='privacy_consent')
    date_signed = models.DateField(auto_now_add=True)
    has_consented = models.BooleanField(default=True)

    class Meta:
        db_table = 'privacy_consent'

    def clean(self):
        """
        Custom validation to enforce required fields based on submission status.
        """
        if self.submission.status == 'draft':
            return
        
        elif self.submission.status == 'submitted':
            required_fields = {
                'student': 'required',
                'has_consented': 'required'
            }
            check_required_fields(self, required_fields, self.submission.status)

            if not self.has_consented:
                raise ValidationError({
                    'has_consented': 'Consent must be given before submission.'
                })

    def __str__(self):
        return f"Consent for {self.submission.form_type} - {self.student.student_number}"
