from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from forms.models import (
    CollegeEnum, YearLevelEnum, SemesterEnum,
    DegreeProgramEnum, PhilippineRegionEnum, SupportChoices
)

def enum_to_dict(enum_class):
    try:
        return [{"value": e.value, "label": e.label} for e in enum_class]
    except AttributeError as e:
        return {"error": f"Error processing enum: {str(e)}"}

class EnumChoicesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            enum_data = {
                "college": enum_to_dict(CollegeEnum),
                "year_level": enum_to_dict(YearLevelEnum),
                "semester": enum_to_dict(SemesterEnum),
                "degree_program": enum_to_dict(DegreeProgramEnum),
                "region": enum_to_dict(PhilippineRegionEnum),
                "support": enum_to_dict(SupportChoices),
            }
            return Response(enum_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
