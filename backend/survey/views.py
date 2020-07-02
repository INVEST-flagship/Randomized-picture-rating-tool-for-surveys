from django.db import models

from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework import viewsets, views, serializers, status
from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication,
    RemoteUserAuthentication
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings

from rest_framework_csv.renderers import CSVRenderer

from .serializers import (
    QuestionnaireSerializer,
    AnswerSerializer,
    DemographicsSerializer
)

from .models import Picture, Questionnaire, Answer, Attribute

import json

from .constants import PROVINCES, GENDER_CHOICES, EDUCATION_CHOICES

class QuestionnaireViewSet(viewsets.ModelViewSet):

    authentication_classes = ()
    permission_classes = ()
    # throttle_scope = 'question_sets'
    # queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

    ## We are using partial update to return id of next picture ##
    #if questionnaire object with sent id exists:
    #if it doesnt, return 404
    # if questionnaire has less than 50 answers listed:
    #  we return random picture id
    # else:
    #  if questionnaire has been redirected to raffle:
    #   we are returning http response code 423, Locked
    #   that will tell the frontend to show "all done, please go away"-message
    #  else:
    #   we are returning http response code 204, No Content
    #   set .participated_in_raffle=True
    #   that will tell the frontend to proceed to raffle part
    def partial_update(self, *args, **kwargs):
        response_dict = {}
        try:
            questionnaire_obj = Questionnaire.objects.get(user_id=self.request.data.get('key'))
        except:
            return Response({'Error': 'Not Found'}, status=status.HTTP_404_NOT_FOUND)
        if not questionnaire_obj.filled_demograpic_info or questionnaire_obj.province is None:
            response_dict['gender'] = GENDER_CHOICES
            response_dict['age'] = Questionnaire.AGE_CHOICES
            response_dict['education'] = EDUCATION_CHOICES
            response_dict['provinces'] = PROVINCES
            response_dict['instructions'] = questionnaire_obj.attribute.instructions
            return HttpResponse(json.dumps( response_dict ), status=status.HTTP_202_ACCEPTED)

        # if questionnaire has less than 50 answers listed:
        elif questionnaire_obj.answers.count()<50:
            # return random picture id
            attr = questionnaire_obj.attribute.name
            picture_qs =Picture.objects\
                .exclude(picture_id__in=questionnaire_obj.requested_pictures)\
                .exclude(province=questionnaire_obj.province)\
                .filter(control_picture=questionnaire_obj.control_group)
            attr_gt_40 = {'hits_per_attribute__' +attr+'__gt':40}
            picture_qs2 = picture_qs.exclude(**attr_gt_40)
            if len(picture_qs2)>0:
                picture = picture_qs2.order_by('?').first()
            else:
                picture = picture_qs.order_by('?').first()
            response_dict['picture'] = picture.picture_id
            response_dict['occupation'] = picture.occupation
            response_dict['likert'] = questionnaire_obj.attribute.likert
            response_dict['title'] = questionnaire_obj.attribute.title
            response_dict['subheading'] = questionnaire_obj.attribute.subheading
            response_dict['reviews'] = questionnaire_obj.answers.count()

            questionnaire_obj.requested_pictures.append(picture.picture_id)
            questionnaire_obj.save()

            return HttpResponse(json.dumps( response_dict ))
        else:
            # if questionnaire has been redirected to raffle:
            if questionnaire_obj.participated_in_raffle:
                return Response('Forbidden', status=status.HTTP_403_FORBIDDEN)
            else:
                return Response('No Content', status=status.HTTP_204_NO_CONTENT)

class PictureViewSet(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = QuestionnaireSerializer

    def get_queryset(self):
        question_set_hashcode = self.kwargs.get('pk', '')
        attr = Questionnaire.objects.get(hashcode=question_set_hashcode).attribute.name
        filter_str = {'hits_per_attribute__'+attr+'__lte':40}
        filtered_pictures = Picture.objects.filter(**filter_str)
        filtered_picture = filtered_pictures[0]

        return filtered_picture

class AnswerViewSet(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = ()
    serializer = AnswerSerializer

    def create(self, *args, **kwargs):
        try:
            questionnaire_obj = Questionnaire.objects.get(
                user_id=self.request.data.get('key')
            )
            picture_id = self.request.data.get('picture')
            if not picture_id==questionnaire_obj.requested_pictures[-1]:
                return Response(
                    {'Error': 'Bad Request'},
                    status=status.HTTP_409_CONFLICT
                )
            Answer.objects.create(
                picture=picture_id,
                value=self.request.data.get('value'),
                questionnaire=questionnaire_obj,
            )
            picture_obj = Picture.objects.get(picture_id=picture_id)
            picture_obj.hits_per_attribute[questionnaire_obj.attribute.name]=picture_obj.hits_per_attribute.get(questionnaire_obj.attribute.name, 0) +1
            picture_obj.save()

            # print("ek")
            # questionnaire_obj.requested_pictures.append(picture_obj.picture_id)
            # questionnaire_obj.save()
            # print("muu")

            return Response(
                'Created',
                status=status.HTTP_201_CREATED
            )
        except:
            return Response(
                {'Error': 'Bad Request'},
                status=status.HTTP_400_BAD_REQUEST
            )

class DemographicsViewSet(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = DemographicsSerializer
    queryset = Questionnaire.objects.filter(filled_demograpic_info=False)
    lookup_field = 'user_id'

class AnswerCSVRenderer(CSVRenderer):
    header = ['koodi',]

    for attribute in Attribute.objects.all():
        for picture in Picture.objects.all():
            header.append(attribute.name+'_'+picture.picture_id)

class AnswerCSVSet(views.APIView):
    authentication_classes = [BasicAuthentication]
    renderer_classes = [AnswerCSVRenderer]

    def get(self, *args, **kwargs):
        rowdata = []
        questionnaires = Questionnaire.objects.filter(requested_pictures__len__gt=0)
        for questionnaire in questionnaires:
            answers_dict = {}
            answers_dict['koodi'] = questionnaire.user_id
            answers = questionnaire.answers.all()
            for answer in answers:
                answers_dict[questionnaire.attribute.name+'_'+answer.picture]=answer.value
            rowdata.append(answers_dict)
        return Response(rowdata) 
