<<<<<<< HEAD
# OSA/admin.py
from django.contrib import admin
from .models import *

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_number', 'first_name', 'last_name', 'college', 'current_year_level', 'degree_program')
    search_fields = ('student_number', 'first_name', 'last_name')

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('address_line_1', 'barangay', 'city_municipality', 'province', 'region', 'zip_code')
    search_fields = ('barangay', 'city_municipality', 'province')
    
# Register Preferences model
@admin.register(Preferences)
class PreferencesAdmin(admin.ModelAdmin):
    list_display = ('student_number', 'influence', 'reason_for_enrolling', 'transfer_plans', 'transfer_reason', 'shift_plans', 'planned_shift_degree', 'reason_for_shifting')
    search_fields = ('student_number', 'influence')

# Register Support model
@admin.register(Support)
class SupportAdmin(admin.ModelAdmin):
    list_display = ('support_id', 'support_name')
    search_fields = ('support_name',)

# Register StudentSupport model
@admin.register(StudentSupport)
class StudentSupportAdmin(admin.ModelAdmin):
    list_display = ('student_number', 'support', 'other_notes', 'other_scholarship', 'combination_notes')
    search_fields = ('student_number', 'support__support_name')

# Register SocioEconomicStatus model
@admin.register(SocioEconomicStatus)
class SocioEconomicStatusAdmin(admin.ModelAdmin):
    list_display = ('student_number', 'has_scholarship', 'monthly_allowance', 'spending_habit')
    search_fields = ('student_number',)

@admin.register(PresentScholasticStatus)
class PresentScholasticStatusAdmin(admin.ModelAdmin):
    list_display = ('student', 'intended_course', 'first_choice_course', 'admitted_course', 'next_plan')
    search_fields = ('student__first_name', 'student__last_name', 'intended_course', 'first_choice_course')
    
@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'age', 'job_occupation', 'company_agency', 'highest_educational_attainment', 'contact_number')
    search_fields = ('first_name', 'last_name', 'job_occupation', 'company_agency')
    
@admin.register(Sibling)
class SiblingAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'sex', 'age', 'job_occupation', 'educational_attainment')
    search_fields = ('first_name', 'last_name', 'job_occupation', 'educational_attainment')

@admin.register(Guardian)
class GuardianAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'student', 'contact_no', 'address', 'relationship_to_guardian')
    search_fields = ('first_name', 'last_name', 'relationship_to_guardian')

@admin.register(FamilyData)
class FamilyDataAdmin(admin.ModelAdmin):
    list_display = ('student', 'mother', 'father', 'guardian')
    search_fields = ('student__first_name', 'student__last_name', 'mother__first_name', 'father__first_name')

@admin.register(Graduation)
class GraduationAdmin(admin.ModelAdmin):
    list_display = ('academic_year', 'semester', 'graduation_date')
    search_fields = ('academic_year', 'semester')

@admin.register(GraduateStudent)
class GraduateStudentAdmin(admin.ModelAdmin):
    list_display = ('student_number', 'graduation', 'honors_received')
    search_fields = ('student_number__student_number', 'graduation__academic_year')

@admin.register(HealthData)
class HealthDataAdmin(admin.ModelAdmin):
    list_display = ('student_number', 'health_condition', 'height', 'weight', 'eye_sight', 'hearing')
    search_fields = ('student_number__student_number', 'health_condition')

@admin.register(SchoolAddress)
class SchoolAddressAdmin(admin.ModelAdmin):
    list_display = ('address_line_1', 'barangay', 'city_municipality', 'province', 'region', 'zip_code')
    search_fields = ('address_line_1', 'barangay', 'city_municipality', 'province', 'region')

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'address')
    search_fields = ('name', 'address__barangay')

@admin.register(PreviousSchoolRecord)
class PreviousSchoolRecordAdmin(admin.ModelAdmin):
    list_display = ('student_number', 'school', 'education_level', 'start_year', 'end_year', 'honors_received', 'senior_high_gpa')
    search_fields = ('student_number__student_number', 'school__name', 'education_level')

@admin.register(Scholarship)
class ScholarshipAdmin(admin.ModelAdmin):
    list_display = ('student', 'get_scholarships_and_assistance') 
    search_fields = ('student__student_number',) 

    def get_scholarships_and_assistance(self, obj):
        return ", ".join(obj.scholarships_and_assistance) if obj.scholarships_and_assistance else "No scholarships"
    get_scholarships_and_assistance.short_description = "Scholarships/Assistance"

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ('student', 'organization', 'semester', 'academic_year', 'position')  
    list_filter = ('semester', 'academic_year') 
    search_fields = ('student__student_number', 'organization__name')  

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(CollegeAward)
class CollegeAwardAdmin(admin.ModelAdmin):
    list_display = ('student', 'award', 'semester', 'academic_year', 'position')  
    list_filter = ('semester', 'academic_year', 'award') 
    search_fields = ('student__student_number', 'award__name')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
=======
from django.contrib import admin
from .models import Student

admin.site.register(Student)
>>>>>>> parent of 3d98cd7 (removed backend folder)
