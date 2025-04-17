from django.urls import path
from .views import RegisterView, LoginView, UserDetailView, VerifyEmailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
    path('verify/<uuid:token>/', VerifyEmailView.as_view(), name='verify-email'),
]