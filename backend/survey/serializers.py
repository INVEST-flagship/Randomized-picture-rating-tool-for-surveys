from rest_framework import serializers, status
from rest_framework.response import Response
from .models import Answer, Picture, Questionnaire

import json
import copy

class QuestionnaireSerializer(serializers.ModelSerializer):

    user_id = serializers.ReadOnlyField()

    class Meta:
        model = Questionnaire

        fields = (
            'user_id',
        )

class DemographicsSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.filled_demograpic_info=True
        instance.save()
        Questionnaire.objects.filter(pk=instance.pk).update(
            **validated_data
        )
        return instance

    class Meta:
        model = Questionnaire

        fields = (
            'gender',
            'age',
            'education',
            'educationExtra',
            'occupation',
            'province',
        )
        lookup_field = 'user_id'
        required = 'province'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer

        fields = (
            'picture',
            'value',
        )

