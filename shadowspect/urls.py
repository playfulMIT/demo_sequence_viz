from django.urls import path, re_path
from django.views.generic import RedirectView

from . import views

urlpatterns = [
    path("mturk/", views.mturk),
    path("levelloader/", views.levelloader),
    # path("", RedirectView.as_view(url="http://shadowspect.org")),
    re_path(r"^(?P<slug>[a-zA-Z0-9-_]+)/$", views.wildcard_url),
]
