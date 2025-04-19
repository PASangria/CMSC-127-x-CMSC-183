from django.urls import path
from .views import RegisterView, VerifyEmailView, UserProfileView, LoginView, LogoutView
from . import views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify/<uuid:token>/', VerifyEmailView.as_view(), name='verify-email'),
     path("csrf/", views.get_csrf, name="api-csrf"),
    path("login/", LoginView.as_view(), name="api-login"),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
     path('logout/', LogoutView.as_view(), name='api-logout'),
]