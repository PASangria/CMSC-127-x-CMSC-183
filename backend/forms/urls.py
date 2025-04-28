from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Set up the router
router = DefaultRouter()

app_name= 'forms'

urlpatterns = [
    path('', include(router.urls))
]
