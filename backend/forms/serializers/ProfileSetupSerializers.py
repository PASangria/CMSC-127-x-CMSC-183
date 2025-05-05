from rest_framework import serializers
from forms.models import Student, Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__' 
        
class StudentSerializer(serializers.ModelSerializer):
    permanent_address = AddressSerializer()
    address_while_in_up = AddressSerializer()

    class Meta:
        model = Student
        fields = [
            'student_number', 'college', 'current_year_level', 'degree_program', 'user', 
            'last_name', 'first_name', 'middle_name', 'nickname', 'sex', 'religion', 
            'birth_rank', 'birthdate', 'birthplace', 'contact_number', 'landline_number', 
            'permanent_address', 'address_while_in_up'
        ]
