from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from forms.models import (
    Parent, Sibling, Guardian, FamilyData, HealthData, 
    SchoolAddress, School, PreviousSchoolRecord, Scholarship,
    PersonalityTraits, FamilyRelationship, CounselingInformation
)

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'
        extra_kwargs = {field.name: {'required': False} for field in model._meta.fields if field.name != 'id'}

class SiblingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sibling
        fields = '__all__'
        extra_kwargs = {field.name: {'required': False} for field in model._meta.fields if field.name != 'id'}

class GuardianSerializer(serializers.ModelSerializer):
    contact_no = PhoneNumberField()

    class Meta:
        model = Guardian
        fields = '__all__'
        extra_kwargs = {field.name: {'required': False} for field in model._meta.fields if field.name != 'id'}

class FamilyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyData
        fields = '__all__'
        extra_kwargs = {field.name: {'required': False} for field in model._meta.fields if field.name != 'id'}

class HealthDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthData
        fields = '__all__'

class SchoolAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolAddress
        fields = '__all__'

class SchoolSerializer(serializers.ModelSerializer):
    school_address = SchoolAddressSerializer()
    class Meta:
        model = School 
        fields = ['id', 'name', 'school_address']

class PreviousSchoolRecordSerializer(serializers.ModelSerializer):
    school = SchoolSerializer()

    class Meta:
        model = PreviousSchoolRecord
        fields = ['school', 'education_level', 'start_year', 'end_year', 'honors_received', 'senior_high_gpa']

    def create(self, validated_data):
        # Extract the nested 'school' data from validated_data
        school_data = validated_data.pop('school')
        school_address_data = school_data.pop('school_address')

        # Create the school_address first
        school_address = SchoolAddress.objects.create(**school_address_data)

        # Create the School instance, associating it with the newly created school_address
        school = School.objects.create(school_address=school_address, **school_data)

        # Finally, create the PreviousSchoolRecord and associate it with the created school
        previous_school_record = PreviousSchoolRecord.objects.create(school=school, **validated_data)

        return previous_school_record


class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = '__all__'

class PersonalityTraitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalityTraits
        fields = '__all__'

class FamilyRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyRelationship
        fields = '__all__'

class CounselingInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CounselingInformation
        fields = '__all__'
