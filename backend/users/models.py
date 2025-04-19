from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
import re
from django.core.exceptions import ValidationError

class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    verification_token = models.UUIDField(default=uuid.uuid4, editable=False)
    
    def clean(self):
        # Validate username format (student ID)
        if not re.match(r'^\d{4}-\d{5}$', self.username):
            raise ValidationError("Username must be in the format: YYYY-XXXXX (e.g., 2023-12345)")
    
    def __str__(self):
        return self.email


