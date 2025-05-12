from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from forms.models import (
    Parent, Sibling, Guardian, FamilyData, HealthData, 
    SchoolAddress, School, PreviousSchoolRecord, Scholarship,
    PersonalityTraits, FamilyRelationship, CounselingInformation
)


class SiblingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sibling
        fields = '__all__'
        extra_kwargs = {field.name: {'required': False} for field in model._meta.fields if field.name != 'id'}

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'
        extra_kwargs = {field.name: {'required': False} for field in model._meta.fields if field.name != 'id'}

class GuardianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guardian
        fields = '__all__'
        extra_kwargs = {field.name: {'required': False} for field in model._meta.fields if field.name != 'id'}

class FamilyDataSerializer(serializers.ModelSerializer):
    mother = ParentSerializer(required=False)
    father = ParentSerializer(required=False)
    guardian = GuardianSerializer(required=False)

    class Meta:
        model = FamilyData
        fields = '__all__'
        extra_kwargs = {field.name: {'required': False} for field in model._meta.fields if field.name != 'id'}

    def create(self, validated_data):
        mother_data = validated_data.pop('mother', None)
        father_data = validated_data.pop('father', None)
        guardian_data = validated_data.pop('guardian', None)

        if mother_data:
            mother = Parent.objects.create(**mother_data)
            validated_data['mother'] = mother
        if father_data:
            father = Parent.objects.create(**father_data)
            validated_data['father'] = father
        if guardian_data:
            guardian = Guardian.objects.create(**guardian_data)
            validated_data['guardian'] = guardian

        return FamilyData.objects.create(**validated_data)

    def update(self, instance, validated_data):
        mother_data = validated_data.pop('mother', None)
        father_data = validated_data.pop('father', None)
        guardian_data = validated_data.pop('guardian', None)

        if mother_data:
            if instance.mother:
                for attr, value in mother_data.items():
                    setattr(instance.mother, attr, value)
                instance.mother.save()
            else:
                instance.mother = Parent.objects.create(**mother_data)

        if father_data:
            if instance.father:
                for attr, value in father_data.items():
                    setattr(instance.father, attr, value)
                instance.father.save()
            else:
                instance.father = Parent.objects.create(**father_data)

        if guardian_data:
            if instance.guardian:
                for attr, value in guardian_data.items():
                    setattr(instance.guardian, attr, value)
                instance.guardian.save()
            else:
                instance.guardian = Guardian.objects.create(**guardian_data)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


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
        school_data = validated_data.pop('school')
        school_address_data = school_data.pop('school_address')

        school_address = SchoolAddress.objects.create(**school_address_data)
        school = School.objects.create(school_address=school_address, **school_data)

        return PreviousSchoolRecord.objects.create(school=school, **validated_data)

    def update(self, instance, validated_data):
        school_data = validated_data.pop('school', None)
        if school_data:
            address_data = school_data.pop('school_address', None)
            
            school = instance.school
            if school:
                if address_data:
                    address = school.school_address
                    for attr, value in address_data.items():
                        setattr(address, attr, value)
                    address.save()
                
                for attr, value in school_data.items():
                    setattr(school, attr, value)
                school.save()
            else:
                address = SchoolAddress.objects.create(**address_data)
                school = School.objects.create(school_address=address, **school_data)
                instance.school = school

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


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
        read_only_fields = ['student', 'submission']

class CounselingInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CounselingInformation
        fields = '__all__'
