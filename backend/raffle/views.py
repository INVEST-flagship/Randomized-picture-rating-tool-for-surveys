from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Ticket
from survey.models import Questionnaire

class RaffleViewSet(APIView):
    authentication_classes = ()
    permission_classes = ()

    # one post/ticket, name and either email or phone_number are required
    def post(self, *args, **kwargs):
        user_id = self.request.data.get('key' ,'')
        name = self.request.data.get('name')
        email = self.request.data.get('email')
        phone_number = self.request.data.get('phone')
        try:
            questionnaire_obj = Questionnaire.objects.get(user_id=user_id)
            if questionnaire_obj.participated_in_raffle:
                return Response(
                    {'Already participated'},
                    status=status.HTTP_423_LOCKED,
                )
            else:
                questionnaire_obj.participated_in_raffle=True
                questionnaire_obj.save()
        except:
            Response(
                {'Bad Request'},
                status=status.HTTP_404_NOT_FOUND,
            )
        # name and either email or phone_number are required
        if name is None or (email is None and phone_number is None):
            return Response(
                {'Error': 'Bad Request'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            Ticket.objects.create(name=name, email=email, phone_number=phone_number)
            return Response(
                {'Created'},
                status=status.HTTP_201_CREATED,
            )
        except:
            return Response(
                {'Error': 'Bad Request'},
                status=status.HTTP_400_BAD_REQUEST,
            )


