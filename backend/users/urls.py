from django.urls import path
from . import views
from .views import test_connection
from .views import CustomUserViewSet
from djoser import views

urlpatterns = [
    path('test/', test_connection),
      path('auth/users/', CustomUserViewSet.as_view({'post': 'create'}), name='user-list'),
]