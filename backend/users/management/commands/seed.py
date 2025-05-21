from django.core.management.base import BaseCommand
from .factories import (
    StudentFactory,
    SubmissionFactory,
    PreferencesFactory,
    StudentSupportFactory,
    SocioEconomicStatusFactory,
    PresentScholasticStatusFactory,
    PrivacyConsentFactory,
)

NUM_STUDENTS = 50

class Command(BaseCommand):
    help = 'Seeds the database with fake student data and form submissions.'

    def handle(self, *args, **kwargs):
        for _ in range(NUM_STUDENTS):
            student = StudentFactory()
            submission = SubmissionFactory(student=student)

            PreferencesFactory(student_number=student, submission=submission)
            StudentSupportFactory(student_number=student, submission=submission)
            SocioEconomicStatusFactory(student_number=student, submission=submission)
            PresentScholasticStatusFactory(student=student, submission=submission)
            PrivacyConsentFactory(student=student, submission=submission)

        self.stdout.write(self.style.SUCCESS(f'Successfully created {NUM_STUDENTS} students and related form data.'))
