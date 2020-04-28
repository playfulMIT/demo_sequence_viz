from django.shortcuts import render
from django.views.generic import ListView, DetailView, FormView
from django.forms import ModelForm
import json
from urllib import request
import requests
from urllib.request import urlopen
from .models import CleanedEvent, Player
from .forms import SeqFilter, PlayerFilter
from bokeh.plotting import figure, output_file, show
from bokeh.resources import CDN
from bokeh.embed import components
from bokeh.transform import linear_cmap, factor_cmap
from bokeh.models import ColumnDataSource
from bokeh.palettes import Viridis256, magma
from bokeh.layouts import grid, column


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
            events = CleanedEvent.objects.all().filter(user=playerForm.cleaned_data['chooseUser']).filter(
                data__has_key='timeStamp').order_by('time')
        else:
            events = CleanedEvent.objects.all().filter(user=playerList.first()).filter(
                data__has_key='timeStamp').order_by('time')

        # output to static HTML file (with CDN resources)
        # puzzles = []
        # for event in events:
        #    if event.type is 'ws_puzzle-started' or 'ws_start-level' or 'ws_puzzle-complete':
        #        if event.data['task_id'] not in puzzles:
        #            puzzles.append(event.data['task_id'])

        timeStamps = {'time': [],
                      'eventType': [],
                      # 'puzzles': [],
                      }
        # for puzzle in puzzles:
        for event in events:
            timeStamps['time'].append(event.data['timeStamp'])
            timeStamps['eventType'].append(event.type)
                # timeStamps['puzzle'].append(event.data['task_id'])

        TOOLS = "hover,wheel_zoom,box_zoom,reset"
        cds = ColumnDataSource(data=timeStamps)
        p = figure(tools=TOOLS, x_range=(0, max(timeStamps['time'])),
                   plot_width=int(max(timeStamps['time'])), plot_height=400)

        cmap = {
                'ws-move_shape': '#000003',
                'ws-click_disabled': '#07051B',
                'ws-deselect_shape': '#150E38',
                'ws-rotate_view':  '#281159',
                'ws-exit_to_menu': '#3E0F72',
                'ws-undo_action': '#55137D',
                'ws-scale_shape': '#691C80',
                'ws-select_shape': '#7E2481',
                'ws-mode_change': '#942B80',
                'ws-puzzle_started': '#A9327C',
                'ws-start_level': '#C03A75',
                'ws-click_nothing': '#D4436D',
                'ws-delete_shape': '#E75262',
                'ws-check_solution': '#F3675B',
                'ws-create_shape': '#FA7F5E',
                'ws-rotate_shape': '#FD9969',
                'ws-disconnect':  '#FEB179',
                'ws-puzzle_complete': '#FECB8E',
                'ws-snapshot': '#FCE3A5',
                'ws-toggle_paint_display': '#FBFCBF',
                'ws-palette_change': '#FEAC75',
                'ws-paint':  '#FB8A62',
                'ws-redo_action': '#E44E64',
                'ws-cancel_submit': '#D7456B',
                'ws-restart_puzzle': '#742081',
                'ws-toggle_snapshot_display': '#822581',
                'ws-start_game': '#EE5B5E',
                'ws-login_user': '#912A80',
                'ws-create_user': '#AE347B',
                'ws-select_shape_add':  '#20114D',
        }

        p.circle(x='time', y=1, radius=6, source=cds,
               fill_color=factor_cmap('eventType', palette=list(cmap.values()), factors=list(cmap.keys())))
        p.hover.tooltips = [
            ('eventType', '@eventType'),
        ]
        fullWidth = column(p, sizing_mode='stretch_width')
        script, div = components(fullWidth, CDN)
        context['script'] = script
        context['div'] = div
        print(timeStamps)
        context['playerForm'] = playerForm
        context['events'] = events
        return context

