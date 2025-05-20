from django.db import models
from .student import Student
from .submission import Submission
from forms.utils.helperFunctions import check_required_fields
from django.core.exceptions import ValidationError

class PersonalityTraits(models.Model):
    student = models.ForeignKey('Student', to_field='student_number', on_delete=models.CASCADE)
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    enrollment_reason = models.TextField(verbose_name="Why did you enroll in UP Mindanao?", null=True, blank=True)
    degree_program_aspiration = models.BooleanField(verbose_name="Does your degree program lead to what you aspire in the future?", null=True, blank=True)
    aspiration_explanation = models.TextField(null=True, blank=True, verbose_name="If not, why?")
    special_talents = models.TextField(verbose_name="What are your special talents and abilities?", null=True, blank=True)
    musical_instruments = models.TextField(verbose_name="Specify the musical instruments you play", null=True, blank=True)
    hobbies = models.TextField(verbose_name="What are your hobbies?", null=True, blank=True)
    likes_in_people = models.TextField(verbose_name="What do you like in people?", null=True, blank=True)
    dislikes_in_people = models.TextField(verbose_name="What do you dislike in people?", null=True, blank=True)

    def clean(self):
        """
        Custom validation to enforce conditional fields based on submission status.
        """
        if self.submission.status == 'draft':
            return

        elif self.submission.status == 'submitted':
            required_fields = {
                'student': 'required',
                'enrollment_reason': 'required',
                'degree_program_aspiration': 'required',
                'special_talents': 'required',
                'musical_instruments': 'required',
                'hobbies': 'required',
                'likes_in_people': 'required',
                'dislikes_in_people': 'required',
            }

            check_required_fields(self, required_fields, self.submission.status)

            
            if not self.degree_program_aspiration and not self.aspiration_explanation:
                raise ValidationError({
                    'aspiration_explanation': 'This field is required when degree program aspiration is false.'
                })

    def __str__(self):
        return f"Personality Traits - {self.student.first_name} {self.student.last_name}"
    
class FamilyRelationship(models.Model):
    CLOSEST_CHOICES = [
        ('Father', 'Father'),
        ('Mother', 'Mother'),
        ('Brother', 'Brother(s)'),
        ('Sister', 'Sister(s)'),
        ('Other', 'Others (specify)')
    ]

    student = models.ForeignKey('Student', on_delete=models.CASCADE, to_field='student_number', related_name='family_relationships')
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    closest_to = models.CharField(max_length=20, choices=CLOSEST_CHOICES, null=True, blank=True, verbose_name="With whom are you closest to?")
    specify_other = models.CharField(max_length=100, null=True, blank=True, verbose_name="Others (specify)")

    class Meta:
        db_table = 'family_relationships'
        unique_together = ['student', 'closest_to']

    def clean(self):
        """
        Custom validation to enforce the required fields based on submission status.
        """
        if self.submission.status == 'draft':
            return  
        
        elif self.submission.status == 'submitted':
            required_fields = {
                'student': 'required',
                'closest_to': 'required',
            }
            for field_name, field_type in required_fields.items():
                if getattr(self, field_name) in [None, '']:
                    raise ValidationError({field_name: f'{field_name} is required when submission is submitted.'})
            
            if self.closest_to == 'other' and not self.specify_other:
                raise ValidationError({'specify_other': 'Please specify the relationship when "Other" is selected for "Closest to"'})

    def __str__(self):
        return f"{self.student.first_name}'s closest relationship: {self.get_closest_to_display()}"

class CounselingInformation(models.Model):
    student = models.OneToOneField('Student', on_delete=models.CASCADE, to_field='student_number', related_name='counseling_info')
    personal_characteristics = models.TextField(verbose_name="Personal characteristics as a person", null=True, blank=True)
    problem_confidant = models.CharField(max_length=100, verbose_name="To whom do you open-up your problems?", null=True, blank=True)
    confidant_reason = models.TextField(verbose_name="Why?", null=True, blank=True)
    anticipated_problems = models.TextField(verbose_name="Any problem that you might encounter later while in UP?", null=True, blank=True)
    previous_counseling = models.BooleanField(null=True, blank=True, default=False, verbose_name="Any previous counseling?")
    counseling_location = models.CharField(max_length=100, null=True, blank=True, verbose_name="If yes, where?")
    counseling_reason = models.TextField(null=True, blank=True, verbose_name="Why?")
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)


    def clean(self):
        """
        Custom validation to enforce conditional fields based on the submission status.
        """
        if self.submission.status == 'draft':
            return
        
        elif self.submission.status == 'submitted':
            required_fields = {
                'student': 'required',
                'personal_characteristics': 'required',
                'problem_confidant': 'required',
                'confidant_reason': 'required',
                'anticipated_problems': 'required',
                'previous_counseling': 'required'
            }

            check_required_fields(self, required_fields, self.submission.status)
            
            if self.previous_counseling:
                if not self.counseling_location:
                    raise ValidationError({'counseling_location': 'This field is required when there is previous counseling.'})
                if not self.counseling_reason:
                    raise ValidationError({'counseling_reason': 'This field is required when there is previous counseling.'})

    def __str__(self):
        return f"Counseling Information for {self.student.first_name} {self.student.last_name} ({self.student.student_number})"
   
    