# OSA/admin.py
from django.contrib import admin
from .models import Student, Address, CollegeEnum, YearLevelEnum, DegreeProgramEnum, PhilippineRegionEnum, Preferences, Support, StudentSupport, SocioEconomicStatus, PresentScholasticStatus

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

# Register PresentScholasticStatus model
@admin.register(PresentScholasticStatus)
class PresentScholasticStatusAdmin(admin.ModelAdmin):
    list_display = ('student', 'intended_course', 'first_choice_course', 'admitted_course', 'next_plan')
    search_fields = ('student__first_name', 'student__last_name', 'intended_course', 'first_choice_course')

