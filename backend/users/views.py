from django.forms import ValidationError
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from .serializers import CustomUserCreateSerializer
from djoser.views import UserViewSet, TokenDestroyView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, AuditLogSerializer
from .models import AuditLog
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from users.utils import log_action
from rest_framework import status
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from django.http import JsonResponse

def test_connection(request):
    return JsonResponse({'status': 'Django connected successfully'})

class CustomUserViewSet(UserViewSet):
    serializer_class = CustomUserCreateSerializer
    
    @action(methods=["post"], detail=False, url_path="set_password")
    def set_password(self, request, *args, **kwargs):
        response = super().set_password(request, *args, **kwargs)
        if response.status_code == 204:
            log_action(request, 'password', 'Password Changed')
        return response
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.user
            request.user = user  
            log_action(request, 'auth', 'User logged in')
        return response
    
class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all().order_by('-timestamp')
    serializer_class = AuditLogSerializer
    permission_classes = [IsAdminUser]

class CustomTokenDestroyView(TokenDestroyView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        user = request.user if request.user.is_authenticated else None
        refresh_token = request.data.get('refresh')
        if not user and refresh_token:
            try:
                from rest_framework_simplejwt.tokens import RefreshToken, TokenError
                from django.contrib.auth import get_user_model
                token = RefreshToken(refresh_token)
                user_id = token.payload.get('user_id')
                User = get_user_model()
                user = User.objects.get(id=user_id)
                request.user = user
            except Exception:
                pass
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_204_NO_CONTENT and getattr(response, 'data', None) is None:
            log_action(request, 'auth', 'User logged out')
        return response