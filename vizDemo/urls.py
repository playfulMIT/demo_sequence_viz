from django.urls import path
from .views import Seq, Persistence, bentoBox

urlpatterns = [
    # path('rubrics', views.update_challenge, name='challenge-form'),
    # path('', ChallengeListView.as_view(), name='challenges'),
    # path('challenge/<int:pk>', login_required(ChallengeDetail.as_view()), name='challenge-detail'),
    # path('challengeCover/<int:pk>', login_required(ChallengeCover.as_view()), name='challenge-cover'),
    # path('challenge/<int:pk>/upload', views.solution_submission, name='solution'),
    # path('show', levelsOfActivityView, name='show'),
    # path('edit/', views.edit, name='edit'),
    path('seq', Seq.as_view(), name='seq'),
    path('persistence', Persistence.as_view(), name='persistence'),
    path('bentoBox', bentoBox, name='bentobox')
]