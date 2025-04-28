from django.urls import path
from .views import RegisterView, VerifyEmailView
from . import views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify/<uuid:token>/', VerifyEmailView.as_view(), name='verify-email'),
]