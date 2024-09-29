from django.db import models
from users.models import CustomUser
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Dashboard(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user_dashboard", null=False)
