from rest_framework import serializers

from .models import Event, Player  # , GameSession


class EventSerializer(serializers.ModelSerializer):
    # session = Session.objects.get(pk=session)
    class Meta:
        model = Event
        fields = "__all__"


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ("name",)
