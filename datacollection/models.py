import inspect

from django.contrib.sessions.backends.db import SessionStore as DBStore
from django.contrib.sessions.base_session import AbstractBaseSession
from django.db import models
from django.utils import timezone


class CustomSession(AbstractBaseSession):
    player = models.ForeignKey("Player", null=True, on_delete=models.SET_NULL)
    url = models.ForeignKey("URL", null=True, on_delete=models.SET_NULL)
    ip = models.CharField(max_length=45, null=True)  # IPv6 can have length up to 45
    useragent = models.TextField(null=True)

    @classmethod
    def get_session_store_class(cls):
        return SessionStore


class SessionStore(DBStore):
    @classmethod
    def get_model_class(cls):
        return CustomSession

    def save(self, must_create=False):
        print("saving session store")
        curframe = inspect.currentframe()
        calframe = inspect.getouterframes(curframe, 2)
        print("caller name:", calframe[1][3])
        print("save details:" + str(self.__dict__))
        super().save(must_create)

    # def create_model_instance(self, data):
    #     obj = super().create_model_instance(data)
    #     try:
    #         account_id = int(data.get('_auth_user_id'))
    #     except (ValueError, TypeError):
    #         account_id = None
    #     obj.account_id = account_id
    #     return obj


class Event(models.Model):
    time = models.DateTimeField(default=timezone.now)
    # user = models.ForeignKey(User, on_delete=models.CASCADE) # index on user
    session = models.ForeignKey(
        "datacollection.CustomSession", null=True, on_delete=models.SET_NULL
    )
    type = models.CharField(max_length=32)
    data = models.TextField()

    def __str__(self):
        session = str(self.session) if self.session else "no_session"
        time = str(self.time) if self.time else "no_time"
        type = str(self.type) if self.type else "no_type"
        data = str(self.data) if self.data else "no_data"
        id = str(self.id) if self.id else "no_id"
        return session + ";" + time + ";" + type + ";" + data + ";" + id


class URL(models.Model):
    name = models.CharField(primary_key=True, max_length=50)
    data = models.TextField(null=True, blank=True)
    levels = models.ForeignKey(
        "shadowspect.Level", blank=True, null=True, on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.name


class Player(models.Model):
    name = models.CharField(max_length=50)
    url = models.ForeignKey("URL", null=True, on_delete=models.SET_NULL)
    attempted = models.ManyToManyField(
        "shadowspect.Level", blank=True, related_name="levels_attempted"
    )
    completed = models.ManyToManyField(
        "shadowspect.Level", blank=True, related_name="levels_completed"
    )

    def __str__(self):
        return self.name
