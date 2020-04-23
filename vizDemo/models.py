from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from datacollection.models import Event

# Create your models here.
class Player(models.Model):
    user = models.CharField(max_length=200, default='')
    events = ArrayField(
        models.CharField(max_length=50),
        default=list
    )


class CleanedEvent(models.Model):
    time = models.DateTimeField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE) # index on user
    session = models.CharField(max_length=100)
    type = models.CharField(max_length=32)
    data = JSONField(default=list)
