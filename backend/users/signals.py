# users/signals.py
from django.contrib.auth.models import Group
from django.db.models.signals import post_migrate
from django.dispatch import receiver
import logging

logger = logging.getLogger(__name__)

@receiver(post_migrate)
def create_default_groups(sender, **kwargs):
    Group.objects.get_or_create(name='admin')
    Group.objects.get_or_create(name='student')
    logger.info("Default groups 'admin' and 'student' created (if not already present).")
        
def assign_group(user):
    try:
        if user.role == 'admin':
            group = Group.objects.get(name='admin')
        else:
            group = Group.objects.get(name='student')
        user.groups.add(group)
    except Group.DoesNotExist:
        logger.error(f"Group {user.role} does not exist.")
