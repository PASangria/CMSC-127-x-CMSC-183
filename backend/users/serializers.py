from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.mail import send_mail
from django.conf import settings

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}   
        
    def validate_email(self, value):
        if not value.endswith('@gmail.com'):
            raise serializers.ValidationError("Email must be a university email.")
        return value
        
    def create(self, validated_data):
        # Create an inactive user
        user = User.objects.create_user(
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

