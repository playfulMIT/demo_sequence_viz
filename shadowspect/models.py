from django.db import models


class Level(models.Model):
    filename = models.CharField(max_length=50, unique=True)
    data = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.filename


class Replay(models.Model):
    filename = models.CharField(max_length=50, unique=True)
    data = models.TextField(null=True, blank=True)
