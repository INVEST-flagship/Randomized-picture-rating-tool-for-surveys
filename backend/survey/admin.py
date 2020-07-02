from django.contrib import admin
from .models import Answer, Picture, Questionnaire, Attribute


class AnswerAdmin(admin.ModelAdmin):
    search_fields = ('picture', )
    list_display = ('questionnaire','picture', 'value')
    ordering = ['questionnaire', 'picture']

class PictureAdmin(admin.ModelAdmin):
    search_fields = ('picture_id',)
    list_display = ('picture_id', 'hits_per_attribute', 'province', 'occupation')
    ordering = ['picture_id']

class QuestionnaireAdmin(admin.ModelAdmin):
    search_fields = ('user_id',)
    list_display = ('user_id', 'attribute', 'number_of_attempts')

class AttributeAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name', 'likert')


admin.site.register(Answer, AnswerAdmin)
admin.site.register(Picture, PictureAdmin)
admin.site.register(Questionnaire, QuestionnaireAdmin)
admin.site.register(Attribute, AttributeAdmin)
