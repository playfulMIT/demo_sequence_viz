import json

from django.http import JsonResponse

from datacollection.models import URL, CustomSession
from shadowspect.models import Level


def get_config_json(request):
    print("sessionpk config: " + str(request.session.__dict__))
    session = CustomSession.objects.get(session_key=request.session.session_key)
    print("sessionpk customsession: " + str(session.__dict__))
    urlpk = request.session["urlpk"]
    url = URL.objects.get(pk=urlpk)
    data = json.loads(url.data)
    print(data)
    if "groupID" not in data and url is not None:
        print("no group id, injecting it from URL")
        data["groupID"] = urlpk
    return JsonResponse(data)


def get_level_json(request, slug):
    level = Level.objects.get(filename=slug)
    data = json.loads(level.data)
    return JsonResponse(data)


def generate_session(request):
    if not request.session.session_key:
        request.session.save()
        # request.session.accessed = False
        # request.session.modified = False
        print("created session key")
    # print("session key: " + request.session.session_key)
    session = CustomSession.objects.get(session_key=request.session.session_key)

    if session.useragent is None:
        session.useragent = str(request.META.get("HTTP_USER_AGENT"))
    if session.ip is None:
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            session.ip = x_forwarded_for.split(",")[0]
        else:
            session.ip = request.META.get("REMOTE_ADDR")
    session.save(update_fields=["useragent", "ip"])
    session.accessed = False
    session.modified = False
    request.session.accessed = False
    request.session.modified = False
    return session
