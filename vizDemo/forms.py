from django import forms
from .models import CleanedEvent, Player


class SeqFilter(forms.ModelForm):

    class Meta:
        model = CleanedEvent
        fields = ['data']


class PlayerFilter(forms.ModelForm):
    chooseUser = forms.ModelChoiceField(queryset=Player.objects.all())

    class Meta:
        model = Player
        fields = ['chooseUser']
