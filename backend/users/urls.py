from django.urls import path
from . import views
from .views import test_connection

urlpatterns = [
    path('test/', test_connection),
]