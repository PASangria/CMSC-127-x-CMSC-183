from rest_framework import viewsets
from forms.models import PrivacyConsent, Submission
from rest_framework import serializers
    
class PrivacyConsentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyConsent
        fields = '__all__'
        extra_kwargs = {
            field.name: {'required': False} for field in model._meta.fields if field.name != 'id'
        }
        
class SubmissionSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField()
     
    class Meta:
        model = Submission
        fields = ['id', 'form_type', 'status', 'saved_on', 'submitted_on', 'created_at', 'updated_at', 'student']