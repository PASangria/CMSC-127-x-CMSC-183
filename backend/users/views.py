from django.forms import ValidationError
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from .serializers import RegisterSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            print("Serializer validation errors:", serializer.errors)
            raise e

        user = serializer.save()

        return Response({
            'message': 'Registration successful. Please check your email to verify your account.',
            'user': RegisterSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, token):
        user = get_object_or_404(User, verification_token=token)

        if not user.is_active:
            user.is_active = True
            user.is_verified = True
            user.save()

        return redirect("http://localhost:5173/verified?status=verified")
