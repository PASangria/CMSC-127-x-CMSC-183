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