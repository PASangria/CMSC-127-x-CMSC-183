import json
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import ensure_csrf_cookie
from .serializers import RegisterSerializer, UserProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect



User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'message': 'Registration successful. Please check your email to verify your account.',
            'user': RegisterSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, token):
        user = get_object_or_404(User, verification_token=token)

        if not user.is_active:
            user.is_active = True
            user.is_verified = True
            user.save()

        return redirect("http://localhost:5173/verified") 


def get_csrf(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import authenticate, login
from django.http import JsonResponse


# class LoginView(APIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [AllowAny]

#     def post(self, request):
#         data = request.data
#         username = data.get("username")
#         password = data.get("password")
#         role = data.get("role")  # 'admin' or 'student'

#         if not all([username, password, role]):
#             return JsonResponse({"detail": "Username, password, and role are required."}, status=400)

#         user = authenticate(request, username=username, password=password)
#         if user is None:
#             return JsonResponse({"detail": "Invalid credentials"}, status=400)

#         if role == 'admin' and not user.is_superuser:
#             return JsonResponse({"detail": "You are not authorized to log in as an admin."}, status=403)

#         if role == 'student' and user.is_superuser:
#             return JsonResponse({"detail": "Admins must log in through the admin portal."}, status=403)

#         login(request, user)

#         return JsonResponse({
#             "message": "Login successful",
#             "username": user.username,
#             "is_superuser": user.is_superuser
#         }, status=200)

class LoginView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")
        role = data.get("role")  # 'admin' or 'student'

        # Check if all required fields are provided
        if not all([username, password, role]):
            return JsonResponse({"detail": "Username, password, and role are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(request, username=username, password=password)
        if user is None:
            return JsonResponse({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Role-based checks
        if role == 'admin' and not user.is_superuser:
            return JsonResponse({"detail": "You are not authorized to log in as an admin."}, status=status.HTTP_403_FORBIDDEN)

        if role == 'student' and user.is_superuser:
            return JsonResponse({"detail": "Admins must log in through the admin portal."}, status=status.HTTP_403_FORBIDDEN)

        # Log in the user
        login(request, user)

        return JsonResponse({
            "message": "Login successful",
            "username": user.username,
            "is_superuser": user.is_superuser
        }, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    
class LogoutView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        logout(request)  
        return JsonResponse({'message': 'Logged out successfully'}, status=200)
    
@login_required
def user_dashboard(request):
    if request.user.is_superuser:
        return JsonResponse({"message": "Admins are not allowed on user dashboard"}, status=403)
    return JsonResponse({"message": "Welcome to the User Dashboard"})

@login_required
def admin_dashboard(request):
    if not request.user.is_superuser:
        return JsonResponse({"message": "You are not an admin"}, status=403)
    return JsonResponse({"message": "Welcome to the Admin Dashboard"})