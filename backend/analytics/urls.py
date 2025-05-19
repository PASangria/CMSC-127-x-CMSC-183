from django.urls import path
from . import views

urlpatterns = [
    path('summary/', views.dashboard_summary_data),
    path('bar-data/', views.students_per_degree_program),
]
