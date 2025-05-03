from django.dispatch import receiver
from rest_framework import serializers
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from .models import Role 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .signals import assign_group
from django.db.models.signals import post_save

User = get_user_model()

class CustomUserCreateSerializer(UserCreateSerializer):
    role = serializers.ChoiceField(choices=Role.choices, default=Role.STUDENT)
    
    class Meta:
        model = User
        fields = ('email', 'password', 're_password', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if attrs["password"] != attrs["re_password"]:
            raise serializers.ValidationError({"re_password": "Passwords do not match."})
        return attrs

    def validate_email(self, value):
        if not value.endswith('@gmail.com'):
            raise serializers.ValidationError("Email must be a university email.")
        return value
    
    
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role  
        return token


@receiver(post_save, sender=CustomUser)
def assign_group_on_user_creation(sender, instance, created, **kwargs):
    if created:
        assign_group(instance)