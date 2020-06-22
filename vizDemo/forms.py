from django import forms
from .models import CleanedEvent, Player
from django.contrib.postgres.forms.jsonb import JSONField


class SeqFilter(forms.ModelForm):
    choosePuzzle = forms.ModelChoiceField(queryset=CleanedEvent.objects.all().filter(data__has_key='task_id').order_by(
        'data__task_id').values_list('data__task_id', flat=True).distinct('data__task_id'), required=False)

    class Meta:
        model = CleanedEvent
        fields = ['choosePuzzle']


class PlayerFilter(forms.ModelForm):
    chooseUser = forms.ModelChoiceField(queryset=Player.objects.all(), required=False)

    class Meta:
        model = Player
        fields = ['chooseUser']




