# views.py
from rest_framework import viewsets
from forms.models import Preferences, StudentSupport, SocioEconomicStatus, PresentScholasticStatus
from forms.serializers import (
    PreferencesSerializer,
    StudentSupportSerializer,
    SocioEconomicStatusSerializer,
    PresentScholasticStatusSerializer,
)
from .GeneralSubmissionViewSet import DraftSubmissionMixin

class PreferencesViewSet(DraftSubmissionMixin, viewsets.ModelViewSet):
    queryset = Preferences.objects.all()
    serializer_class = PreferencesSerializer

class StudentSupportViewSet(DraftSubmissionMixin, viewsets.ModelViewSet):
    queryset = StudentSupport.objects.all()
    serializer_class = StudentSupportSerializer

class SocioEconomicStatusViewSet(DraftSubmissionMixin, viewsets.ModelViewSet):
    queryset = SocioEconomicStatus.objects.all()
    serializer_class = SocioEconomicStatusSerializer

class PresentScholasticStatusViewSet(DraftSubmissionMixin, viewsets.ModelViewSet):
    queryset = PresentScholasticStatus.objects.all()
    serializer_class = PresentScholasticStatusSerializer