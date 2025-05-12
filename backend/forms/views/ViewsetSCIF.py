from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from forms.models import (
    Parent, Sibling, Guardian, 
    FamilyData, HealthData, 
    SchoolAddress, School, PreviousSchoolRecord, 
    Scholarship, PersonalityTraits, FamilyRelationship, CounselingInformation
)
from forms.serializers import (
    ParentSerializer, SiblingSerializer, GuardianSerializer,
    FamilyDataSerializer, HealthDataSerializer, 
    SchoolAddressSerializer, SchoolSerializer, PreviousSchoolRecordSerializer, 
    ScholarshipSerializer, PersonalityTraitsSerializer, FamilyRelationshipSerializer, CounselingInformationSerializer
)

from rest_framework.decorators import action
from rest_framework.response import Response

class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def get_family_data(self, request, pk=None):
        parent = self.get_object()
        family_data = parent.family_data.all()
        serializer = FamilyDataSerializer(family_data, many=True)
        return Response(serializer.data)

class SiblingViewSet(viewsets.ModelViewSet):
    queryset = Sibling.objects.all()
    serializer_class = SiblingSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def get_family_data(self, request, pk=None):
        sibling = self.get_object()
        family_data = sibling.family_data.all()
        serializer = FamilyDataSerializer(family_data, many=True)
        return Response(serializer.data)

class GuardianViewSet(viewsets.ModelViewSet):
    queryset = Guardian.objects.all()
    serializer_class = GuardianSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def get_family_data(self, request, pk=None):
        guardian = self.get_object()
        family_data = guardian.family_data.all()
        serializer = FamilyDataSerializer(family_data, many=True)
        return Response(serializer.data)

class FamilyDataViewSet(viewsets.ModelViewSet):
    queryset = FamilyData.objects.all()
    serializer_class = FamilyDataSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=True, methods=['get'])
    def get_parents_and_guardian(self, request, pk=None):
        family_data = self.get_object()
        data = {
            "mother": ParentSerializer(family_data.mother).data if family_data.mother else None,
            "father": ParentSerializer(family_data.father).data if family_data.father else None,
            "guardian": GuardianSerializer(family_data.guardian).data if family_data.guardian else None
        }
        return Response(data)

class HealthDataViewSet(viewsets.ModelViewSet):
    queryset = HealthData.objects.all()
    serializer_class = HealthDataSerializer
    permission_classes = [IsAuthenticated]
    
    
class SchoolAddressViewSet(viewsets.ModelViewSet):
    queryset = SchoolAddress.objects.all()
    serializer_class = SchoolAddressSerializer
    permission_classes = [IsAuthenticated]


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.select_related('address').all()
    serializer_class = SchoolSerializer
    permission_classes = [IsAuthenticated]


class PreviousSchoolRecordViewSet(viewsets.ModelViewSet):
    queryset = PreviousSchoolRecord.objects.select_related('school', 'student_number').all()
    serializer_class = PreviousSchoolRecordSerializer
    permission_classes = [IsAuthenticated]
    
class ScholarshipViewSet(viewsets.ModelViewSet):
    queryset = Scholarship.objects.select_related('student', 'submission').all()
    serializer_class = ScholarshipSerializer
    permission_classes = [IsAuthenticated]
    
class PersonalityTraitsViewSet(viewsets.ModelViewSet):
    queryset = PersonalityTraits.objects.select_related('student', 'submission').all()
    serializer_class = PersonalityTraitsSerializer
    permission_classes = [IsAuthenticated]

class FamilyRelationshipViewSet(viewsets.ModelViewSet):
    queryset = FamilyRelationship.objects.select_related('student', 'submission').all()
    serializer_class = FamilyRelationshipSerializer
    permission_classes = [IsAuthenticated]

class CounselingInformationViewSet(viewsets.ModelViewSet):
    queryset = CounselingInformation.objects.select_related('student').all()
    serializer_class = CounselingInformationSerializer
    permission_classes = [IsAuthenticated]