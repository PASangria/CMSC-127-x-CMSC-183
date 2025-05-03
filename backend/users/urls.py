from django.urls import path
from . import views
from .views import test_connection
from .views import CustomUserViewSet
from djoser import views
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('test/', test_connection),
    path('auth/users/create/', CustomUserViewSet.as_view({'post': 'create'}), name='user-create'),
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]