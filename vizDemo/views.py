from django.shortcuts import render
from django.views.generic import ListView, DetailView, FormView
from django.forms import ModelForm
import json
from urllib import request
import requests
from urllib.request import urlopen
from .models import CleanedEvent, Player
from .forms import SeqFilter, PlayerFilter
from bokeh.plotting import figure


def sequenceOfEvents(request):
    response = requests.get('http://104.248.237.179/api/players/')
    print('response' + str(response.status_code))


class Seq(ListView):
    model = CleanedEvent
    queryset = CleanedEvent.objects.all()
    template_name = 'vizDemo/seq.html'

    def get_context_data(self, **kwargs):
        context = super(Seq, self).get_context_data()
        playerList = Player.objects.all()

        playerForm = PlayerFilter(self.request.GET)
        if playerForm.is_valid():
            events = CleanedEvent.objects.all().filter(user=playerForm.cleaned_data['chooseUser'])
        else:
            events = CleanedEvent.objects.all().filter(user=playerList.first())

        context['playerForm'] = playerForm
        context['events'] = events
        return context

