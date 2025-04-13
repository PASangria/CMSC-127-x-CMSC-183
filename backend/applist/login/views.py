from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Get all student records
    serializer_class = UserSerializer  # Use the StudentSerializer for this view
