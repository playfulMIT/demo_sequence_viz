from django.views.generic import FormView
import requests
from .models import CleanedEvent
from .forms import SeqFilter, PlayerFilter, PersistenceForm
from bokeh.plotting import figure
from bokeh.resources import CDN
from bokeh.embed import components
from bokeh.models import NumeralTickFormatter
from bokeh.layouts import column
from django.shortcuts import render
import json


def sequenceOfEvents(request):
    response = requests.get('http://104.248.237.179/api/players/')
    print('response' + str(response.status_code))


class Seq(FormView):
    model = CleanedEvent
    # queryset = CleanedEvent.objects.none()
    template_name = 'vizDemo/seq.html'
    form_class = SeqFilter

    def get_context_data(self, **kwargs):
        context = super(Seq, self).get_context_data()
        # playerList = Player.objects.all()
        filterSet = [
            'ws-puzzle_started',
            'ws-rotate_view',
            'ws-exit_to_menu',
            'ws-scale_shape',
            'ws-deselect_shape',
            'ws-select_shape',
            'ws-click_nothing',
            'ws-delete_shape',
            'ws-check_solution',
            'ws-create_shape',
            'ws-rotate_shape',
            'ws-disconnect',
            'ws-puzzle_complete',
            'ws-snapshot',
            'ws-restart_puzzle',
            'ws-start_game',
            'ws-select_shape_add'
        ]


        # queryset = CleanedEvent.objects.all().filter(type__in=filterSet)
        # print(queryset.count())
        seqForm = SeqFilter(self.request.GET)
        playerForm = PlayerFilter(self.request.GET)

        # sortByPlayer = bool()

            # sortByPlayer = True

        # else:
        #    events = CleanedEvent.objects.all().filter(user=playerList.first()).filter(
        #       data__has_key='timeStamp')

        if seqForm.is_valid():
            if seqForm.cleaned_data['choosePuzzle'] == '':
                if seqForm.cleaned_data['chooseUser'] == '':
                    events = CleanedEvent.objects.filter(type__in=filterSet).filter(data__has_key='timeStamp')
                else:
                    events = CleanedEvent.objects.filter(type__in=filterSet).filter(data__has_key='timeStamp').filter(
                        user=seqForm.cleaned_data['chooseUser'])
                milestoneEvents = events.order_by('puzzle').distinct('puzzle')

            else:
                if seqForm.cleaned_data['chooseUser'] is None:
                    events = CleanedEvent.objects.filter(type__in=filterSet).filter(puzzle=seqForm.cleaned_data['choosePuzzle']).filter(
                        data__has_key='timeStamp')
                else:
                    events = CleanedEvent.objects.filter(type__in=filterSet).filter(puzzle=seqForm.cleaned_data['choosePuzzle']).filter(
                        data__has_key='timeStamp').filter(user=seqForm.cleaned_data['chooseUser'])
                milestoneEvents = events.order_by('user').distinct('user')
            # print(events.count())
            # sortByPlayer = False
            context['eventCount'] = events.count()
        else:
            events = None
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
        TOOLS = "wheel_zoom,box_zoom,reset,xpan,"
        graphs = []
        puzzles = []

        manipulateShape = {
            'ws-delete_shape',
            'ws-rotate_shape',
            'ws-create_shape',
            'ws-create_shape',
            'ws-select_shape'
        }

        milestoneevent = {
            'ws-puzzle_started',
            'ws-restart_puzzle',
            'ws-exit_to_menu',
            'ws-disconnect',
            'we-puzzle_complete'
        }

        for milestoneEvent in milestoneEvents.iterator():

            if seqForm.cleaned_data['choosePuzzle'] == '':
                puzzleEvents = events.filter(puzzle=milestoneEvent.puzzle)
                context['puzzleName'] = milestoneEvent.puzzle
                name = milestoneEvent.puzzle
            else:
                puzzleEvents = events.filter(user=milestoneEvent.user)
                context['puzzleName'] = milestoneEvent.user.user
                name = str(milestoneEvent.user)

            puz2 = {
                'time': 'event'
            }
            # puz['time'].append(int(milestoneEvent.data['timeStamp']))
            # puz['event'].append(milestoneEvent.type)

            puz2.update({milestoneEvent.data['timeStamp']: milestoneEvent.type})
            # print(milestoneEvent.data['task_id'] + ' ' + str(puzzleEvents.count()))
            # puzzle['name'] = milestoneEvent.data['task_id']
            maxTime = puzzleEvents.latest('data__timeStamp').data['timeStamp']

            if puzzleEvents.count() != 0:
                for puzzleEvent in puzzleEvents.iterator():
                    # puz['time'].append(int(puzzleEvent.data['timeStamp']))
                    # puz['event'].append(puzzleEvent.type)
                    puz2.update({int(puzzleEvent.data['timeStamp']): puzzleEvent.type})
                # puzzles.append(t)
                # print(max(puz['time']))
                # cds = ColumnDataSource(data=puz)
                p = figure(title=name, tools=TOOLS, toolbar_location='above', x_range=(0, maxTime),
                           plot_width=1400, plot_height=300, name=name, lod_factor=2, output_backend='webgl')

                for k, v in puz2.items():
                    if v in manipulateShape:
                        p.circle(x=k, y=1, size=20, line_width=1, line_color='#A9327C',
                                 fill_color='red', legend_label='manipulate shape')
                    elif v in milestoneevent:
                        p.diamond(x=k, y=1, size=30, line_width=1, line_color='#A9327C',
                                 fill_color='green', legend_label='milestone event')
                    elif v == 'ws-check_solution':
                        p.square(x=k, y=1, size=30, fill_color='purple', legend_label='submission')
                    elif v == 'ws-snapshot':
                        p.triangle(x=k, y=1, size=20, fill_color='yellow', legend_label='snapshot')
                    elif v == 'ws-rotate_view':
                        p.triangle(x=k, y=1, size=20, fill_color='blue', legend_label='rotate view')
                    elif v == 'ws-click_nothing':
                        p.asterisk(x=k, y=1, size=10, fill_color='orange', legend_label='clicked nothing')
                    # else:
                        # p.circle_x(x=k, y=1, size=10, line_width=1, line_color='#A9327C', fill_color='#DBFF33')
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
        # print(str(len(graphs)) + ' number of graphs')

        return context


class Persistence(FormView):
    template_name = 'vizDemo/persistence.html'
    form_class = PersistenceForm

    def get_context_data(self, **kwargs):
        context = super(Persistence, self).get_context_data()
        return context


def bentoBox(request):
    r = requests.get('http://104.248.237.179/api/dashboard/leja/persistence')

    players = r.json()
    obj_str = json.dumps(players).replace('NON_PERSISTANT', 'Non Persistent').replace('PRODUCTIVE_PERSISTANCE', 'Prod. Persistence').replace('UNPRODUCTIVE_PERSISTANCE', 'Unprod. Persistence').replace('NO_BEHAVIOR', 'No Behavior').replace('RAPID_SOLVER', 'Rapid Solver')
    players = json.loads(obj_str)
    # print(players)
    return render(request, 'vizDemo/bentobox.html', {'persistenceOutput': players, })


def monsterMap(request):
    r = requests.get('http://104.248.237.179/api/dashboard/leja/persistence')

    players = r.json()
    # obj_str = json.dumps(players).replace('NON_PERSISTANT', 'Non Persistent').replace('PRODUCTIVE_PERSISTANCE', 'Prod. Persistence').replace('UNPRODUCTIVE_PERSISTANCE', 'Unprod. Persistence').replace('NO_BEHAVIOR', 'No Behavior').replace('RAPID_SOLVER', 'Rapid Solver')
    # players = json.loads(obj_str)
    # print(players)
    return render(request, 'vizDemo/monstermap.html', {'persistenceOutput': players, })
