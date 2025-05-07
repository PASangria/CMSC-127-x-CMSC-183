from django.db import models
from .student import Student

class PersonalityTraits(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, to_field='student_number', related_name='personality_traits')
    enrollment_reason = models.TextField(verbose_name="Why did you enroll in UP Mindanao?")
    degree_program_aspiration = models.BooleanField(verbose_name="Does your degree program lead to what you aspire in the future?")
    aspiration_explanation = models.TextField(null=True, blank=True, verbose_name="If not, why?")
    special_talents = models.TextField(verbose_name="What are your special talents and abilities?")
    musical_instruments = models.TextField(verbose_name="Specify the musical instruments you play")
    hobbies = models.TextField(verbose_name="What are your hobbies?")
    likes_in_people = models.TextField(verbose_name="What do you like in people?")
    dislikes_in_people = models.TextField(verbose_name="What do you dislike in people?")

    def __str__(self):
        return f"Personality Traits - {self.student.first_name} {self.student.last_name}"

class FamilyRelationship(models.Model):
    RELATIONSHIP_CHOICES = [
        ('father', 'Father'),
        ('mother', 'Mother'),
        ('brother', 'Brother(s)'),
        ('sister', 'Sister(s)'),
        ('other', 'Others')
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, to_field='student_number', related_name='family_relationships')
    relationship_type = models.CharField(max_length=20, choices=RELATIONSHIP_CHOICES)
    is_closest = models.BooleanField(default=False, verbose_name="With whom are you closest to?")
    specify_other = models.CharField(max_length=100, null=True, blank=True, verbose_name="Others (specify)")

    class Meta:
        unique_together = ['student', 'relationship_type']

    def __str__(self):
        return f"{self.student.first_name}'s relationship with {self.get_relationship_type_display()}"

class CounselingInformation(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, to_field='student_number', related_name='counseling_info')
    personal_characteristics = models.TextField(verbose_name="Personal characteristics as a person")
    problem_confidant = models.CharField(max_length=100, verbose_name="To whom do you open-up your problems?")
    confidant_reason = models.TextField(verbose_name="Why?")
    anticipated_problems = models.TextField(verbose_name="Any problem that you might encounter later while in UP?")
    previous_counseling = models.BooleanField(default=False, verbose_name="Any previous counseling?")
    counseling_location = models.CharField(max_length=100, null=True, blank=True, verbose_name="If yes, where?")
    counseling_reason = models.TextField(null=True, blank=True, verbose_name="Why?")

    def __str__(self):
        return f"Counseling Information - {self.student.first_name} {self.student.last_name}"

class PrivacyConsent(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, to_field='student_number', related_name='privacy_consent')
    date_signed = models.DateField(verbose_name="Date Signed")
    has_consented = models.BooleanField(default=False)

    def __str__(self):
        return f"Privacy Consent - {self.student.first_name} {self.student.last_name}" 