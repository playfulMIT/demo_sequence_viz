from django import forms
from .models import CleanedEvent


class SeqFilter(forms.ModelForm):

    class Meta:
        model = CleanedEvent
        fields = ['data']
