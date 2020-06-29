from django import forms
from .models import CleanedEvent, Player
from django.contrib.postgres.forms.jsonb import JSONField


class SeqFilter(forms.Form):
    choosePuzzle = forms.ChoiceField(choices=[], required=False, )
    chooseUser = forms.ModelChoiceField(queryset=Player.objects.all(), required=False, empty_label='All')

    # chooseUser = forms.ChoiceField(choices=[], required=False)

    def __init__(self, *args, **kwargs):
        super(SeqFilter, self).__init__(*args, **kwargs)
        # self.fields['chooseUser'].choices = Player.objects.all().values_list('user', 'user')
        self.fields['choosePuzzle'].choices = CleanedEvent.objects.all().values_list('puzzle', 'puzzle').distinct()
        self.fields['choosePuzzle'].choices.insert(0, ('', 'All'))


class PlayerFilter(forms.ModelForm):
    chooseUser = forms.ModelChoiceField(queryset=Player.objects.all(), required=False)

    class Meta:
        model = Player
        fields = ['chooseUser']




