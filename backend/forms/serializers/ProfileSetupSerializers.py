from rest_framework import serializers
from forms.models import Student, Address
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import ListAPIView
from users.models import CustomUser


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__' 
        
class StudentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    permanent_address = AddressSerializer()
    address_while_in_up = AddressSerializer()

    class Meta:
        model = Student
        fields = [
            'student_number', 'college', 'current_year_level', 'degree_program', 'user', 
            'last_name', 'first_name', 'middle_name', 'nickname', 'sex', 'religion', 
            'birth_rank', 'birthdate', 'birthplace', 'contact_number', 'landline_number', 
            'permanent_address', 'address_while_in_up', 'email', 'date_initial_entry', 'date_initial_entry_sem',
        ]
    