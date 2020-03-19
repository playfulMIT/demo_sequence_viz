# import logging

# from django.contrib.sessions.models import Session

from django.http import StreamingHttpResponse, HttpResponse, JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response

from datacollection.serializers import EventSerializer
from .models import Event, Player, URL, CustomSession  # , GameSession
from .serializers import PlayerSerializer  # , GameSessionSerializer

# logger = logging.getLogger(__name__)


class EventViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows fingerprints to be viewed or edited.
    """

    queryset = Event.objects.all().order_by("-id")
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        if not request.session.session_key:
            request.session.save()
        key = (
            request.data.get("session")
            if request.data.get("session")
            else str(request.session.session_key)
        )
        request.data._mutable = True
        request.data.update({"session": key})
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        sessionObj = CustomSession.objects.get(pk=key)
        serializer.save(session=sessionObj)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class PlayerViewSet(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all().order_by("-id")

    def perform_create(self, serializer):
        urlpk = self.request.session["urlpk"]
        url = URL.objects.get(pk=urlpk)
        serializer.save(url=url)


class Echo:
    """An object that implements just the write method of the file-like
    interface.
    """

    def __init__(self, column_headers):
        self.header = column_headers
        self.header_written = False

    def write(self, value):
        if not self.header_written:
            value = self.header + "\n" + str(value)
            self.header_written = True
        """Write the value by returning it, instead of storing in a buffer."""
        value_string = str(value) + "\n"
        return value_string.encode("utf-8")


def filtered_data_as_http_response(rows, headers, filename):
    if rows:
        pseudo_buffer = Echo(headers)
        response = StreamingHttpResponse(
            (pseudo_buffer.write(row) for row in rows), content_type="text/csv"
        )
        response["Content-Disposition"] = 'attachment; filename="' + filename + '"'
    else:
        response = HttpResponse("No data found with current filters")
    return response


def streaming_event_csv(request):
    """A view that streams a large CSV file."""
    # yesterday = timezone.now() - timedelta(days=1)
    # rows = Message.objects.filter(creation_time__gt=yesterday).order_by("transcript", "creation_time")
    rows = Event.objects.all().order_by("session", "time")
    # print(rows.count())
    return filtered_data_as_http_response(
        rows, "session;time;type;data;id", "eventlogs.csv"
    )


def generate_replay(request, slug):
    query = Event.objects.filter(session=slug)
    serializer = EventSerializer(query, many=True)
    return JsonResponse({"events": serializer.data}, safe=False)
