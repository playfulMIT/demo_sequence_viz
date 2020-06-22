from django import forms
from .models import CleanedEvent, Player
from django.contrib.postgres.forms.jsonb import JSONField


class SeqFilter(forms.Form):
    choosePuzzle = forms.ChoiceField(choices=[], required=False)

    def __init__(self, *args, **kwargs):
        super(SeqFilter, self).__init__(*args, **kwargs)
        self.fields['choosePuzzle'].choices = CleanedEvent.objects.all().values_list('puzzle', 'puzzle').distinct()


class PlayerFilter(forms.ModelForm):
    chooseUser = forms.ModelChoiceField(queryset=Player.objects.all(), required=False)

    class Meta:
        model = Player
        fields = ['chooseUser']




