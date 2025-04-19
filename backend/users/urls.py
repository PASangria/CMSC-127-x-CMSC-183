from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    UserProfileView,  # Changed from UserDetailView
    VerifyEmailView,
    EmailVerificationView,
    LogoutView  # Added LogoutView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/verify-email/', EmailVerificationView.as_view(), name='verify-email-available'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),  # Added logout endpoint
    path('api/me/', UserProfileView.as_view(), name='user-profile'),  # Changed from user-detail
    path('api/verify/<uuid:token>/', VerifyEmailView.as_view(), name='verify-email'),
]