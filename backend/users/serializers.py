from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.core.exceptions import ValidationError
import uuid

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}   
        
    def validate_email(self, value):
        if not value.endswith('@gmail.com'):
            raise serializers.ValidationError("Email must be a university email.")
        return value
        
    def create(self, validated_data):
        # Create an inactive user
        user = User.objects.create_user(
        first_name=validated_data['first_name'],
        last_name=validated_data['last_name'],
        username=validated_data['username'],
        email=validated_data['email'],
        password=validated_data['password'],
        is_active=False
    )
        
        # Send verification email with backend URL since the frontend is not deployed yet
        verification_url = f"http://127.0.0.1:8000/api/users/verify/{user.verification_token}"
        send_mail(
            'Verify your email',
            f'Please click this link to verify your email: {verification_url}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
        
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    role = serializers.CharField() 

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')

        # Ensure that username and password are provided
        if not username or not password:
            raise ValidationError("Must include username and password.")

        # Attempt authentication
        user = authenticate(username=username, password=password)
        if not user:
            raise ValidationError("Invalid credentials.")

        # Check if the user has verified email (optional)
        if not user.is_active:
            raise ValidationError("Please verify your email first.")

        # Check if the role is valid for the user
        if role == 'admin' and not user.is_superuser:
            raise ValidationError("User is not authorized as admin.")
        elif role == 'student' and user.is_superuser:
            raise ValidationError("Admins must log in as admin.")

        # Attach user to the validated data
        data['user'] = user
        return data

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'is_superuser']