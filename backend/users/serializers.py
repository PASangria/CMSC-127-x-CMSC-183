from rest_framework import serializers
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):
    pass

class LoginSerializer(serializers.Serializer):
    pass
