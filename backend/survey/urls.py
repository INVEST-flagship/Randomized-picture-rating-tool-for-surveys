from django.urls import path, re_path
from . import views

urlpatterns =[
    path(
        'questionnaire',
        views.QuestionnaireViewSet.as_view({
            "post": "partial_update"
        }),
        name="get_picture",
    ),
    path(
        'answer',
        views.AnswerViewSet.as_view({
            "post": "create"
        }),
        name="create_answer",
    ),
    path(
        'results',
        views.AnswerCSVSet.as_view()
    ),
    path(
        'demographics/<str:user_id>',
        views.DemographicsViewSet.as_view({
            "patch": "partial_update",
        }),
        name="update_demographics",
    ),
]
