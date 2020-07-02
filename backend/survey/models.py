from django.db import models
from django.contrib.postgres.fields import JSONField, ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

from .constants import PROVINCES, GENDER_CHOICES, EDUCATION_CHOICES
from .utils import json_attributes_template, create_unique_uuid, create_id, empty_dictionary


#list of pictures in /static/ and metadata
class Picture(models.Model):
    # file name of picture, without .jpg
    picture_id = models.CharField(
        max_length=10,
        unique=True,
    )

    # number of hits/attribute
    hits_per_attribute = JSONField(
        default=empty_dictionary,
    )

    # province of subject used for filtering
    province = models.IntegerField(
        choices=PROVINCES,
    )

    # profession of the subject
    occupation = models.TextField(
        blank=True,
    )

    control_picture = models.BooleanField(
        default=False,
    )

class Attribute(models.Model):
    # readable name of the attribute
    name = models.CharField(
        max_length=50,
        default=None,
    )

    # data used to populate radiobuttons in frontend
    # JSON format = [{'value':<integer>, 'label':<string>}, ..]
    likert = JSONField()

    #readable title for form rendered in frontend
    title = models.TextField(
        blank=True,
        default=""
    )

    #readable subheading for form rendered in frontend
    subheading = models.TextField(
        blank=True,
        default=""
    )

    instructions = models.TextField(
        blank=True,
        default=""
    )

    def __str__(self):
        return (
            f"{self.name}"
        )

class Questionnaire(models.Model):
    AGE_CHOICES = list(zip(range(1955, 2003), range(1955, 2003)))

    # Will change to Tast taker ID, 6-8 chars [A-Z, 1-9]
    user_id = models.CharField(
        max_length=8,
        unique=True,
        db_index=True,
        default=create_id,
    )

    control_group = models.BooleanField(
        default=False,
    )

    # demographic data
    gender = models.IntegerField(
        choices=GENDER_CHOICES,
        null=True,
        blank=True,
    )

    # demographic data
    age = models.IntegerField(
        choices=AGE_CHOICES,
        null=True,
        blank=True,
    )

    # demographic data
    education = models.IntegerField(
        choices=EDUCATION_CHOICES,
        null=True,
        blank=True,
    )

    educationExtra = models.TextField(
        null=True,
        blank=True,
    )

    # demographic data
    occupation = models.TextField(
        null=True,
        blank=True,
    )

    # demographic data
    province = models.IntegerField(
        choices=PROVINCES,
        null=True,
        blank=True,
    )

    # used to limit the number test taker can visit the survey
    number_of_attempts =  models.IntegerField(
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ],
        null=False,
        blank=False,
        default=0,
    )

    # FK: Attribute.pk
    attribute = models.ForeignKey(
        Attribute,
        related_name="questionnaires",
        on_delete=models.PROTECT,
        blank=False,
    )

    # contains list of requested pictures, used for data validation
    requested_pictures = ArrayField(
        models.CharField(
            max_length=10,
            blank=False
            ),
        size=50,
        blank=True,
    )

    # used to direct user to raffle participation only once
    participated_in_raffle = models.BooleanField(
        default=False,
    )

    # has filled the demographic fields
    filled_demograpic_info = models.BooleanField(
        default=False,
    )

class Answer(models.Model):
    #file name of picture
    picture = models.CharField(
        max_length=10,
    )

    #selected value
    value = models.IntegerField(
        null=False,
        blank=False,
    )

    # FK: Questionnaire.pk
    questionnaire = models.ForeignKey(
        Questionnaire,
        related_name="answers",
        on_delete=models.CASCADE,
        blank=False,
    )

    class Meta:
        unique_together = ['picture', 'questionnaire']
        indexes = [
            models.Index(fields=['picture', 'questionnaire'])
        ]

