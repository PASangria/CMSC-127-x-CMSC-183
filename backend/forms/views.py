from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Student, Address
from .serializers import StudentSerializer, AddressSerializer
from rest_framework.decorators import action
from rest_framework.response import Response 

# Viewset for Address model (for now, remains unrestricted)
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

# Viewset for Student model (restricts updates if profile is completed)
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()  # Add this line to specify the queryset
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return only the logged-in user's student record
        return Student.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        student = serializer.instance
        if student.is_completed:
            raise PermissionDenied("Profile setup is already completed. You cannot make further changes.")
        serializer.save()

    @action(detail=True, methods=['post'])
    def complete_profile(self, request, pk=None):
        student = self.get_object()
        student.is_completed = True
        student.save()
        return Response({'status': 'Profile marked as completed'})

    # Add the profile_status action
    @action(detail=False, methods=['get'])
    def profile_status(self, request):
        student = self.get_queryset().first()  # Get the first record for the logged-in user (assuming only one profile per user)
        if student:
            return Response({'is_completed': student.is_completed})
        return Response({'error': 'Profile not found'}, status=404)