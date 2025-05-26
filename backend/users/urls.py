from django.urls import path
from .views import test_connection
from .views import CustomUserViewSet
from .views import CustomTokenObtainPairView
from .views import CustomTokenDestroyView
from .views import AuditLogViewSet
from rest_framework.routers import DefaultRouter
from django.urls import include

router = DefaultRouter()
router.register(r'auditlog', AuditLogViewSet, basename='auditlog')

urlpatterns = [
    path('test/', test_connection),
    path('auth/users/create/', CustomUserViewSet.as_view({'post': 'create'}), name='user-create'),
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='token-obtain-pair'), 
    path('auth/jwt/logout/', CustomTokenDestroyView.as_view(), name='token-destroy'),
    path('records/', include(router.urls)),
]