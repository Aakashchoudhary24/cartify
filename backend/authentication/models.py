from django.contrib.auth.models import AbstractUser
from django.db import models
from chowkidar.models import AbstractRefreshToken
from datetime import timedelta
from django.utils import timezone

def default_expiry():
    return timezone.now() + timedelta(days=7) 

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="customuser_set", 
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="customuser_permissions_set", 
        blank=True
    )

    def __str__(self):
        return self.username

class RefreshToken(AbstractRefreshToken, models.Model):
    pass