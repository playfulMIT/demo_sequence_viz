from django.shortcuts import render
from django.views.generic import ListView, DetailView, FormView
from django.forms import ModelForm
from .functions import computeLevelsOfActivity
import json
from urllib import request
import requests
from urllib.request import urlopen
from .models import CleanedEvent
from .forms import SeqFilter


# Create your views here.
def levelsOfActivityView(request):
    print('running levels script')
    with urlopen('http://104.248.237.179/api/event/?limit=10000') as response:
        dataurl = response.read()
        data = json.loads(dataurl)
    levels = computeLevelsOfActivity(data)
    return render(request, 'vizDemo/show.html', {'levels': levels})


def sequenceOfEvents(request):
    response = requests.get('http://104.248.237.179/api/players/')
    print('response' + str(response.status_code))


class Seq(ListView):
    model = CleanedEvent
    queryset = CleanedEvent.objects.all().order_by('session')
    template_name = 'vizDemo/seq.html'

    def get_context_data(self, **kwargs):
        context = super(Seq, self).get_context_data()

        events = CleanedEvent.objects.all().order_by('time')
        context['events'] = events
        return context

