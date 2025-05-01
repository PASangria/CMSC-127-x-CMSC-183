from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
from django.core.exceptions import ValidationError
from djoser.serializers import UserCreateSerializer
from django.conf import settings

User = get_user_model()

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 're_password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if attrs["password"] != attrs["re_password"]:
            raise serializers.ValidationError({"re_password": "Passwords do not match."})
        return attrs

    def validate_email(self, value):
        if not value.endswith('@gmail.com'):
            raise serializers.ValidationError("Email must be a university email.")
        return value
