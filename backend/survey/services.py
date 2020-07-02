from django.conf import settings
import csv
from .models import Picture

def striptostring(csvfield):
    for element in csvfield:
        csvfield = element.strip()
    return csvfield


def import_pictures():
    with open(settings.BASE_DIR + '/survey/kuvat.csv') as f:
    # with open('./pictures.csv') as f:
        print('starring import')
        Picture.objects.all().delete()
        uploaded_data = []
        reader = csv.reader(f, delimiter=";")
        #skip headline
        next(reader, None)
        for row in reader:
            if row[0] != '':
                uploaded_data.append(
                    Picture(
                        picture_id=row[0],
                        province=row[1],
                        occupation=row[2]
                    )
                )
        Picture.objects.bulk_create(uploaded_data)
    print('pictures imported')
