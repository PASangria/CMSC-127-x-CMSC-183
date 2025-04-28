from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, AddressViewSet

# Set up the router
router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'addresses', AddressViewSet)

app_name= 'forms'

urlpatterns = [
    path('', include(router.urls))
]
