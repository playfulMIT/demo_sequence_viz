from .models import CleanedEvent, Player
# from django.contrib.postgres.fields import JSONField
import json


players = Player.objects.all()


def AssignPuzzleName():
    for player in players:
        playerEvents = CleanedEvent.objects.all().filter(user=player).order_by('time')
        print(playerEvents.count())
        currentPuzzle = ''
        if playerEvents.count() > 0:
            for playerEvent in playerEvents:
                if playerEvent.puzzle is '':
                    try:
                        playerEvent.data.get('task_id')
                        if playerEvent.data['task_id'] == currentPuzzle:
                            playerEvent.puzzle = playerEvent.data['task_id']
                        else:
                            currentPuzzle = playerEvent.data['task_id']
                            playerEvent.save()
                        print(currentPuzzle)
                        playerEvent.save()
                    except:
                        playerEvent.puzzle = currentPuzzle
                        playerEvent.save()
                # elif playerEvent.data.get('task_id') is None or playerEvent.data['task_id'] == currentPuzzle:


