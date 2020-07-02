from django.urls import path
from . import views

urlpatterns =[
    path(
        'raffle',
        views.RaffleViewSet.as_view()
    ),
]