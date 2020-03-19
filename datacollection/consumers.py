import json

from channels.generic.websocket import AsyncWebsocketConsumer
from django.db import close_old_connections

from shadowspect.models import Level
from .models import Event, Player, CustomSession
from .utils import get_group
from kimchi.settings import DEBUG


class DataCollectionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        close_old_connections()
        if DEBUG:
            print("connection opening")
            print("headers:")
            print(type(self.scope["headers"]))
            print(str(self.scope["headers"]))
            print("ws session: " + str(self.scope["session"].session_key))
        # If the incoming connection doesn't have a session, create & save it
        if self.scope["session"].session_key is None:
            self.scope["session"].save()
            self.scope["session"].accessed = False
            self.scope["session"].modified = False
            print("new session: " + str(self.scope["session"].session_key))

        self.key = self.scope["session"].session_key
        modify_session = False
        add_ip = False
        add_useragent = False
        self.customsession = CustomSession.objects.get(session_key=self.key)
        if self.customsession.ip is None:
            # this ensures the session has an IP attached to it
            add_ip = True
            modify_session = True
        if self.customsession.useragent is None:
            # this ensures the session has a browser useragent attached to it
            add_useragent = True
            modify_session = True
        if modify_session:
            for header in self.scope["headers"]:
                if add_ip and header[0].decode("utf-8") == "x-forwarded-for":
                    self.customsession.ip = header[1].decode("utf-8")
                if add_useragent and header[0].decode("utf-8") == "user-agent":
                    self.customsession.useragent = header[1].decode("utf-8")
            self.customsession.save(update_fields=["ip", "useragent"])
            self.scope["session"].accessed = False
            self.scope["session"].modified = False
        if DEBUG:
            print("custom session state:")
            print(str(self.customsession.__dict__))
        await self.accept()
        await self.send(text_data=self.key)
        close_old_connections()

    async def receive(self, text_data=None, bytes_data=None):
        close_old_connections()
        if text_data:
            data_json = json.loads(text_data)
        if bytes_data:
            data_json = json.loads(bytes_data.decode("utf-8"))
        type = "ws-" + data_json["type"]
        Event.objects.create(
            session=self.customsession, type=type, data=data_json["data"]
        )
        if "start_game" in type:
            url, namejson = get_group(self, data_json)
            players = Player.objects.filter(url=url).values("name")
            players_json = json.dumps(list(players))
            r = {"status": 200, "players": []}
            for p in players:
                r["players"].append(p["name"])
            r = json.dumps(r)
            await self.send(text_data=r)
        elif any(x in type for x in ["login_user", "create_user"]):
            url, namejson = get_group(self, data_json)
            name = namejson["user"]
            player, created = Player.objects.get_or_create(url=url, name=name)
            self.customsession = CustomSession.objects.get(session_key=self.key)
            if not created:
                # attach the player to session
                self.customsession.player = player
                self.customsession.save()
                # get a player's progress here
                attempted = []
                completed = []
                print("name: " + name)
                name_valid = not name == "guest" and not name == ""
                if name_valid:
                    for l in player.attempted.all():
                        attempted.append(l.filename)
                    for l in player.completed.all():
                        completed.append(l.filename)
                if "login_user" in type:
                    response = json.dumps(
                        [
                            {
                                "status": 200,
                                "message": "found",
                                "attempted": attempted,
                                "completed": completed,
                            }
                        ]
                    )
                else:
                    response = json.dumps(
                        [
                            {
                                "status": 409,
                                "message": "exists",
                                "attempted": attempted,
                                "completed": completed,
                            }
                        ]
                    )
            else:
                print("created player")
                self.customsession = CustomSession.objects.get(session_key=self.key)
                print(str(self.customsession.__dict__))
                self.customsession.player = player
                self.customsession.save()
                print(str(self.customsession.__dict__))
                response = json.dumps([{"status": 201, "message": "created"}])
            await self.send(text_data=response)
        elif any(x in type for x in ["puzzle_started", "puzzle_complete"]):
            levelname = json.loads(data_json["data"])["task_id"]
            url, namejson = get_group(self, data_json)
            name = namejson["user"]
            name_valid = not name == "guest" and not name == ""
            print("name: " + name)
            level, createdlevel = Level.objects.get_or_create(filename=levelname)
            if "puzzle_started" in type and name_valid:
                self.customsession.player.attempted.add(level)
            elif "puzzle_complete" in type and name_valid:
                self.customsession.player.completed.add(level)
        close_old_connections()

    async def disconnect(self, code=None):
        Event.objects.create(
            session=self.customsession, type="ws-disconnect", data="{}"
        )
        if code:
            print(code)
        print("disconnect")
