from django.urls import path
from .views import test_connection
from .views import CustomUserViewSet
from .views import CustomTokenObtainPairView

urlpatterns = [
    path('test/', test_connection),
    path('auth/users/create/', CustomUserViewSet.as_view({'post': 'create'}), name='user-create'),
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='token-obtain-pair'), 
]