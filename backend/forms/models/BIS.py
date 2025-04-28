from django.db import models
from django.core.exceptions import ValidationError
from .student import Student
from .enums import CollegeEnum, YearLevelEnum, DegreeProgramEnum 


class Preferences(models.Model):
    student_number = models.ForeignKey('Student', on_delete=models.CASCADE)
    influence = models.CharField(max_length=255)  
    reason_for_enrolling = models.TextField() 
    transfer_plans = models.BooleanField(default=False)  
    transfer_reason = models.TextField()  
    shift_plans = models.BooleanField(default=False) 
    planned_shift_degree = models.CharField(max_length=255, blank=True, null=True)  
    reason_for_shifting = models.TextField(blank=True, null=True)
    
    class Meta:
        db_table = 'preferences' 

    def clean(self):
        """
        Custom validation to enforce the conditional fields.
        """
        if self.shift_plans and not self.planned_shift_degree:
            raise ValidationError({'planned_shift_degree': 'This field is required when shift plans are true.'})
        
        if self.shift_plans and not self.reason_for_shifting:
            raise ValidationError({'reason_for_shifting': 'This field is required when transfer plans are true.'})
    
    def __str__(self):
        return f"Preferences for Student {self.student_number}"
    
    
class Support(models.Model):
    support_id = models.AutoField(primary_key=True)
    support_name = models.CharField(max_length=255) 

    def __str__(self):
        return self.support_name

class StudentSupport(models.Model):
    student_number = models.ForeignKey('Student', on_delete=models.CASCADE)  
    support = models.ForeignKey(Support, on_delete=models.CASCADE) 
    other_notes = models.TextField(blank=True, null=True) 
    other_scholarship = models.TextField(blank=True, null=True) 
    combination_notes = models.TextField(blank=True, null=True)  

    class Meta:
        db_table = 'student_support'

    def clean(self):
        """
        Custom validation to enforce the conditional fields.
        """
        # If support type is 'Other', other_notes is required
        if self.support.support_name == 'Others' and not self.other_notes:
            raise ValidationError({'other_notes': 'This field is required when "Other" support is selected.'})

        # If support type is 'Scholarship', other_scholarship is required
        if self.support.support_name == 'Scholarship' and not self.other_scholarship:
            raise ValidationError({'other_scholarship': 'This field is required when "Scholarship" support is selected.'})

        # If support type is 'Combination', combination_notes is required
        if self.support.support_name == 'Combination' and not self.combination_notes:
            raise ValidationError({'combination_notes': 'This field is required when "Combination" support is selected.'})

    def __str__(self):
        return f"Support for Student {self.student_number}"

class SocioEconomicStatus(models.Model):
    student_number = models.ForeignKey('Student', on_delete=models.CASCADE)
    has_scholarship = models.BooleanField() 
    scholarships = models.TextField(blank=True, null=True) 
    scholarship_privileges = models.TextField(blank=True, null=True) 
    monthly_allowance = models.DecimalField(max_digits=10, decimal_places=2)  
    spending_habit = models.TextField()  

    class Meta:
        db_table = 'socio_economic_status'

    def clean(self):
        """
        Custom validation to enforce the conditional scholarship fields.
        """
        # If the student has a scholarship, scholarships and scholarship_privileges are required
        if self.has_scholarship:
            if not self.scholarships:
                raise ValidationError({'scholarships': 'This field is required when the student has a scholarship.'})
            if not self.scholarship_privileges:
                raise ValidationError({'scholarship_privileges': 'This field is required when the student has a scholarship.'})

    def __str__(self):
        return f"Socio-Economic Status for Student {self.student_number}"

class PresentScholasticStatus(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    intended_course = models.CharField(max_length=255)
    first_choice_course = models.CharField(max_length=255)
    admitted_course = models.CharField(max_length=255)
    next_plan = models.TextField(null=True, blank=True)

    def clean(self):
        # Validate that next_plan is provided if first_choice_course != admitted_course
        if self.first_choice_course != self.admitted_course and not self.next_plan:
            raise ValidationError('Next plan is required if the first choice and admitted course are different.')
    
    def __str__(self):
        return f"Scholastic Status for {self.student.first_name} {self.student.last_name}"

