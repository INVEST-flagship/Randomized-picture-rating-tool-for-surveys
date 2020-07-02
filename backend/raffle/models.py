from django.db import models


# contact information
class Ticket(models.Model):

    email = models.EmailField(
        blank=True,
        null=True,
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
    )

    name = models.CharField(
        max_length=255,
    )

    class Meta:
        app_label = 'raffle'