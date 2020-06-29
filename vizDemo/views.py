from django.shortcuts import render
from django.views.generic import ListView, DetailView, FormView
from django.forms import ModelForm
from django.db.models import Max
import json
from urllib import request
import requests
import datetime
from urllib.request import urlopen
from .models import CleanedEvent, Player
from .forms import SeqFilter, PlayerFilter
from bokeh.plotting import figure, output_file, show
from bokeh.resources import CDN
from bokeh.embed import components
from bokeh.transform import linear_cmap, factor_cmap
from bokeh.models import ColumnDataSource, NumeralTickFormatter, Legend, LegendItem
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

        seqForm = SeqFilter(self.request.GET)
        playerForm = PlayerFilter(self.request.GET)

        sortByPlayer = bool()

        if playerForm.is_valid():
            events = CleanedEvent.objects.all().filter(user=playerForm.cleaned_data['chooseUser']).filter(
                data__has_key='timeStamp')
            milestoneEvents = events.order_by('time').distinct('puzzle')
            sortByPlayer = True

        # else:
        #    events = CleanedEvent.objects.all().filter(user=playerList.first()).filter(
        #       data__has_key='timeStamp')

        if seqForm.is_valid():
            if seqForm.cleaned_data['choosePuzzle'] == '':
                if seqForm.cleaned_data['chooseUser'] == '':
                    events = CleanedEvent.objects.all().filter(data__has_key='timeStamp')
                else:
                    events = CleanedEvent.objects.all().filter(data__has_key='timeStamp').filter(
                        user=seqForm.cleaned_data['chooseUser'])
                milestoneEvents = events.order_by('puzzle').distinct('puzzle')

            else:
                if seqForm.cleaned_data['chooseUser'] is None:
                    events = CleanedEvent.objects.all().filter(puzzle=seqForm.cleaned_data['choosePuzzle']).filter(
                        data__has_key='timeStamp')
                else:
                    events = CleanedEvent.objects.all().filter(puzzle=seqForm.cleaned_data['choosePuzzle']).filter(
                        data__has_key='timeStamp').filter(user=seqForm.cleaned_data['chooseUser'])
                milestoneEvents = events.order_by('user').distinct('user')
            print(events.count())
            sortByPlayer = False
            context['eventCount'] = events.count()

            # print(list(seqEvents).count)
        # output to static HTML file (with CDN resources)
        # puzzles = []
        # for event in events:
        #    if event.type is 'ws_puzzle-started' or 'ws_start-level' or 'ws_puzzle-complete':
        #        if event.data['task_id'] not in puzzles:
        #            puzzles.append(event.data['task_id'])

        # maxTime = max(events.values_list('data__timeStamp', flat=True))
        puzzle = {

                    'event': [],
                    'time': [],

          }


        # for event in events:
        #    timeStamps['time'].append(event.data['timeStamp'])
        #    timeStamps['eventType'].append(event.type)
                # timeStamps['puzzle'].append(event.data['task_id'])
        cmap = {
            'ws-move_shape': '#691C80',
            'ws-click_disabled': '#07051B',
            'ws-deselect_shape': '#150E38',
            'ws-rotate_view': '#281159',
            'ws-exit_to_menu': '#3E0F72',
            'ws-undo_action': '#55137D',
            'ws-scale_shape': '#691C80',
            'ws-select_shape': '#691C80',
            'ws-mode_change': '#942B80',
            'ws-puzzle_started': '#A9327C',
            'ws-start_level': '#C03A75',
            'ws-click_nothing': '#D4436D',
            'ws-delete_shape': '#E75262',
            'ws-check_solution': '#F3675B',
            'ws-create_shape': '#691C80',
            'ws-rotate_shape': '#691C80',
            'ws-disconnect': '#FEB179',
            'ws-puzzle_complete': '#FECB8E',
            'ws-snapshot': '#FCE3A5',
            'ws-toggle_paint_display': '#FBFCBF',
            'ws-palette_change': '#FEAC75',
            'ws-paint': '#FB8A62',
            'ws-redo_action': '#E44E64',
            'ws-cancel_submit': '#D7456B',
            'ws-restart_puzzle': '#742081',
            'ws-toggle_snapshot_display': '#822581',
            'ws-start_game': '#EE5B5E',
            'ws-login_user': '#912A80',
            'ws-create_user': '#AE347B',
            'ws-select_shape_add': '#691C80',
        }
        TOOLS = "hover,wheel_zoom,box_zoom,reset,xpan,"
        graphs = []
        puzzles = []
        for milestoneEvent in milestoneEvents:

            if seqForm.cleaned_data['choosePuzzle'] == '':
                puzzleEvents = events.filter(puzzle=milestoneEvent.puzzle)
                context['puzzleName'] = milestoneEvent.puzzle
                name = milestoneEvent.puzzle
            else:
                puzzleEvents = events.filter(user=milestoneEvent.user)
                context['puzzleName'] = milestoneEvent.user.user
                name = milestoneEvent.user.user

            puz = {
                'time': [],
                'event': []
            }
            puz2 = {
                'time': 'event'
            }
            puz['time'].append(int(milestoneEvent.data['timeStamp']))
            puz['event'].append(milestoneEvent.type)

            puz2.update({milestoneEvent.data['timeStamp']: milestoneEvent.type})
            # print(milestoneEvent.data['task_id'] + ' ' + str(puzzleEvents.count()))
            # puzzle['name'] = milestoneEvent.data['task_id']
            if puzzleEvents.count() != 0:
                for puzzleEvent in puzzleEvents:
                    puz['time'].append(int(puzzleEvent.data['timeStamp']))
                    puz['event'].append(puzzleEvent.type)
                    puz2.update({int(puzzleEvent.data['timeStamp']): puzzleEvent.type})
                # puzzles.append(t)
                print(max(puz['time']))
                cds = ColumnDataSource(data=puz)
                p = figure(title=name, tools=TOOLS, toolbar_location='above', x_range=(0, max((puz['time']))),
                           plot_width=1400, plot_height=300, name=name, lod_factor=2)
                puz3 = puz2.items()

                for k, v in puz3:
                    if v == 'ws-create_shape' or v == 'ws-rotate_shape' or v == 'ws-move_shape' or v == 'ws-select_shape' or v == 'ws-delete_shape':
                        p.circle(x=k, y=1, size=20, line_width=1, line_color='#A9327C',
                                 fill_color='red', legend_label='manipulate shape')
                    elif v == 'ws-puzzle_started' or v == 'ws-restart_puzzle' or v == 'ws-exit_to_menu' or v == 'ws-disconnect':
                        p.diamond(x=k, y=1, size=40, line_width=1, line_color='#A9327C',
                                 fill_color='green', legend_label='milestone event')
                    elif v == 'ws-check_solution':
                        p.square(x=k, y=1, size=50, fill_color='purple', legend_label='submission')
                    elif v == 'ws-rotate_view' or v == 'ws-snapshot':
                        p.triangle(x=k, y=1, size=20, fill_color='yellow', legend_label='snapshot')
                    elif v == 'ws-click_nothing':
                        p.asterisk(x=k, y=1, size=10, fill_color='orange', legend_label='clicked nothing')
                    else:

                        p.circle_x(source=cds, x=k, y=1, size=10, line_width=1, line_color='#A9327C', fill_color=factor_cmap('event', palette=list(cmap.values()), factors=list(cmap.keys())))
                # p.circle(source=cds, x='time', y=1, size=20, line_width=1, line_color='#A9327C', fill_color=factor_cmap('event', palette=list(cmap.values()), factors=list(cmap.keys())), legend_group='event')
                p.xgrid.visible = False
                p.ygrid.visible = False
                p.legend.location = 'bottom_center'
                p.legend.orientation = 'horizontal'
                p.legend.click_policy = 'hide'
                # p.legend.glyph_width = 5
                p.legend.label_text_font_size = '8pt'
                p.min_border = 0
                p.yaxis.visible = False
                # p.x_scale = 'ContinuousScale'
                p.xaxis[0].formatter = NumeralTickFormatter(format='00:00:00')
                # p.hover.tooltips = [('event', 'event'), ('time', 'time')]

                graphs.append(p)
                if puzzle not in puzzles:
                    puzzles.append(puzzle)
        fullWidth = column(graphs)
        script, div = components(fullWidth, CDN)
        context['script'] = script
        context['div'] = div
        context['playerForm'] = playerForm
        context['seqForm'] = seqForm
        context['events'] = events
        print(str(len(graphs)) + ' number of graphs')

        return context

