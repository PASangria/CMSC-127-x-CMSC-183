from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer



class RegisterView(generics.CreateAPIView):
    pass


class LoginView(APIView):
    pass


class UserDetailView(generics.RetrieveAPIView):
    pass