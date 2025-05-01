from django.contrib import admin
from .models import CustomUser
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

admin.site.register(CustomUser)

