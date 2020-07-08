from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField


# Create your models here.
class Player(models.Model):
    user = models.CharField(max_length=200, default='')

    def __str__(self):
        return 'Student ' + str(self.id)


class CleanedEvent(models.Model):
    time = models.DateTimeField()
    user = models.ForeignKey(Player, on_delete=models.CASCADE, null=True)
    session = models.CharField(max_length=100)
    type = models.CharField(max_length=32)
    puzzle = models.CharField(max_length=100)
    data = JSONField(default=dict)
