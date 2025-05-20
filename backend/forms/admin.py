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
    list_display = ('student_number', 'influence', 'reason_for_enrolling', 'transfer_plans', 'shift_plans')
    search_fields = ('student_number__student_number',)

# Register Support model
@admin.register(Support)
class SupportAdmin(admin.ModelAdmin):
    list_display = ('code',)  # Add any fields you'd like to display in the admin list view
    search_fields = ('code',)  # Allow search by code

# Register StudentSupport model
@admin.register(StudentSupport)
class StudentSupportAdmin(admin.ModelAdmin):
    # Display fields in the list view
    list_display = ('student_number', 'display_support', 'other_notes', 'other_scholarship', 'combination_notes')

    # Search functionality
    search_fields = ('student_number__student_number', 'support__code')  # Use 'code' for the search, not the related field name

    # Custom method to display the human-readable support value
    def display_support(self, obj):
        return ", ".join([support.get_code_display() for support in obj.support.all()])
    display_support.short_description = 'Support' 
    
# Register SocioEconomicStatus model
@admin.register(SocioEconomicStatus)
class SocioEconomicStatusAdmin(admin.ModelAdmin):
    list_display = ('student_number', 'has_scholarship', 'monthly_allowance', 'spending_habit')
    search_fields = ('student_number__student_number',)

@admin.register(PresentScholasticStatus)
class PresentScholasticStatusAdmin(admin.ModelAdmin):
    list_display = ('student', 'intended_course', 'first_choice_course', 'admitted_course', 'next_plan')
    search_fields = ('student__first_name', 'student__last_name', 'intended_course', 'first_choice_course')

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('student', 'form_type', 'status', 'created_at', 'submitted_on')
    list_filter = ('form_type', 'status', 'created_at')
    search_fields = ('student__id', 'student__first_name', 'student__last_name')
    ordering = ('-created_at',)
    
@admin.register(FamilyRelationship)
class FamilyRelationshipAdmin(admin.ModelAdmin):
    list_display = ('student', 'closest_to', 'specify_other', 'submission')
    search_fields = ('student__first_name', 'student__last_name', 'student__student_number')
    list_filter = ('submission__status', 'closest_to')

@admin.register(CounselingInformation)
class CounselingInformationAdmin(admin.ModelAdmin):
    list_display = ('student', 'personal_characteristics', 'problem_confidant', 'previous_counseling')
    search_fields = ('student__first_name', 'student__last_name', 'student__student_number')
    list_filter = ('previous_counseling',)
    
class SchoolAddressAdmin(admin.ModelAdmin):
    list_display = ('address_line_1', 'barangay', 'city_municipality', 'province', 'region', 'zip_code')
    search_fields = ('barangay', 'city_municipality', 'province', 'region', 'zip_code')

admin.site.register(SchoolAddress, SchoolAddressAdmin)


# Register School with custom display
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'school_address')
    search_fields = ('name',)

admin.site.register(School, SchoolAdmin)


# Register PreviousSchoolRecord with custom display and validation error handling
class PreviousSchoolRecordAdmin(admin.ModelAdmin):
    list_display = ('student', 'school', 'education_level', 'start_year', 'end_year', 'senior_high_gpa', 'submission')
    search_fields = ('student__first_name', 'student__last_name', 'school__name', 'education_level')
    list_filter = ('education_level', 'submission__status')

admin.site.register(PreviousSchoolRecord, PreviousSchoolRecordAdmin)


# Register Parent with custom display
class ParentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'age', 'contact_number', 'job_occupation', 'company_agency', 'highest_educational_attainment')
    search_fields = ('first_name', 'last_name', 'contact_number', 'job_occupation')

admin.site.register(Parent, ParentAdmin)


# Register Sibling with custom display
class SiblingAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'sex', 'age', 'educational_attainment')
    search_fields = ('first_name', 'last_name', 'educational_attainment')

admin.site.register(Sibling, SiblingAdmin)


# Register Guardian with custom display
class GuardianAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'contact_number', 'relationship_to_guardian', 'address')
    search_fields = ('first_name', 'last_name', 'contact_number', 'relationship_to_guardian')

admin.site.register(Guardian, GuardianAdmin)


# Register FamilyData with custom display
class FamilyDataAdmin(admin.ModelAdmin):
    list_display = ('student', 'mother', 'father', 'guardian')
    search_fields = ('student__first_name', 'student__last_name', 'mother__first_name', 'father__first_name', 'guardian__first_name')

admin.site.register(FamilyData, FamilyDataAdmin)