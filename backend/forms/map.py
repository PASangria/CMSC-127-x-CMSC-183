from forms.models import (
    Preferences, StudentSupport, SocioEconomicStatus, PresentScholasticStatus, PrivacyConsent,
    Parent, Sibling, Guardian, 
    FamilyData, HealthData, 
    SchoolAddress, School, PreviousSchoolRecord, 
    Scholarship, PersonalityTraits, FamilyRelationship, CounselingInformation, Support
)
from forms.serializers import (
    PreferencesSerializer, StudentSupportSerializer, SocioEconomicStatusSerializer, PresentScholasticStatusSerializer, PrivacyConsentSerializer,
    ParentSerializer, SiblingSerializer, GuardianSerializer,
    FamilyDataSerializer, HealthDataSerializer, 
    SchoolAddressSerializer, SchoolSerializer, PreviousSchoolRecordSerializer, 
    ScholarshipSerializer, PersonalityTraitsSerializer, FamilyRelationshipSerializer, CounselingInformationSerializer
)


# These are the mappings only for the sections that are needed to be filled up upon the first submission of the student
FORM_SECTIONS_MAP = {
    'basic-information-sheet': {
        'preferences': (Preferences, PreferencesSerializer),
        'student_support': (StudentSupport, StudentSupportSerializer),
        'socio_economic_status': (SocioEconomicStatus, SocioEconomicStatusSerializer),
        'scholastic_status': (PresentScholasticStatus, PresentScholasticStatusSerializer),
        'privacy_consent': (PrivacyConsent, PrivacyConsentSerializer)
    },
    'student-cumulative-information-file': {
        'siblings': (Sibling, SiblingSerializer),
        'family_data': (FamilyData, FamilyDataSerializer),
        'health_data': (HealthData, HealthDataSerializer),
        'previous_school_record': (PreviousSchoolRecord, PreviousSchoolRecordSerializer),
        'scholarship': (Scholarship, ScholarshipSerializer),
        'personality_traits': (PersonalityTraits, PersonalityTraitsSerializer),
        'family_relationship': (FamilyRelationship, FamilyRelationshipSerializer),
        'counseling_info': (CounselingInformation, CounselingInformationSerializer),
        'privacy_consent': (PrivacyConsent, PrivacyConsentSerializer)
    }
}


OPTIONAL_SECTIONS = {
    'student-cumulative-information-file': ['siblings', 'scholarship', 'counseling_info'],
    'basic-information-sheet': []
}

FORM_TYPE_SLUG_MAP = {
    'basic-information-sheet': 'Basic Information Sheet',
    'student-cumulative-information-file': 'Student Cumulative Information File'
}

FORM_TYPE_UNSLUG_MAP = {
    'Basic Information Sheet': 'basic-information-sheet',
    'Student Cumulative Information File': 'student-cumulative-information-file'
}
