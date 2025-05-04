from rest_framework import serializers
from forms.models import Student, Address

class StudentSerializer(serializers.ModelSerializer):
    permanent_address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())
    address_while_in_up = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())

    class Meta:
        model = Student
        fields = [
            'student_number', 'college', 'current_year_level', 'degree_program', 'user', 
            'last_name', 'first_name', 'middle_name', 'nickname', 'sex', 'religion', 
            'birth_rank', 'birthdate', 'birthplace', 'contact_number', 'landline_number', 
            'permanent_address', 'address_while_in_up', 'is_complete', 'completed_at'
        ]
