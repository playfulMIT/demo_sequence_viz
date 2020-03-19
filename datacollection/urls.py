from django.conf.urls import include, url
from rest_framework import routers

# from django.conf import settings
from . import views

router = routers.DefaultRouter()
# router.register(r'gamesession', views.GameSessionViewSet)
router.register(r"event", views.EventViewSet)
router.register(r"players", views.PlayerViewSet)

urlpatterns = [
    # url(r'^api/gamesession/?$', views.GameSessionViewSet),
    # url(r'^api/event/?$', views.EventViewSet),
    url(r"^api/", include(router.urls)),
    url(r"^eventcsv/", views.streaming_event_csv),
]
