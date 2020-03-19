from django.shortcuts import render
from django.views.generic import ListView, DetailView, FormView
from .functions import computeLevelsOfActivity
import json
from urllib import request
from urllib.request import urlopen

# Create your views here.
def levelsOfActivityView(request):
    print('running levels script')
    with urlopen('http://104.248.237.179/api/event/?limit=10000') as response:
        dataurl = response.read()
        data = json.loads(dataurl)
    levels = computeLevelsOfActivity(data)
    return render(request, 'vizDemo/show.html', {'levels': levels})
