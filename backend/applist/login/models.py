from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils import timezone

# Assuming a Role model exists with RoleID and RoleName.
class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=100)

    def __str__(self):
        return self.role_name


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    up_mail = models.EmailField(unique=True)  # Ensuring email is unique
    password = models.CharField(max_length=255)  # Store the hashed password
    created_at = models.DateTimeField(default=timezone.now)  # Timestamp when the user is created

    def __str__(self):
        return self.up_mail

    class Meta:
        db_table = 'user'  
        verbose_name = 'User'
        verbose_name_plural = 'Users'
