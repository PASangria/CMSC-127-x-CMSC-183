from rest_framework import serializers
from .models import Student, Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    # For POST/PUT: Accept address IDs (writeable)
    address_while_in_up = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())
    permanent_address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())

    class Meta:
        model = Student
        fields = '__all__'

