from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.profilesetup import create_student_profile, get_student_profile
from .views.BIS import FormBundleView, FinalizeSubmissionView

app_name= 'forms'

urlpatterns = [
    path('student/profile/create/', create_student_profile),
    path('student/profile/', get_student_profile),
    path('<str:form_type>/', FormBundleView.as_view(), name='form-bundle'),
    path('finalize/<int:submission_id>/', FinalizeSubmissionView.as_view(), name='finalize-submission'),
]
