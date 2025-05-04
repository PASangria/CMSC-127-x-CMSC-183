from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.profilesetup import create_student_profile, get_student_profile

app_name= 'forms'

urlpatterns = [
    path('student/profile/create/', create_student_profile),
    path('student/profile/', get_student_profile),
]
