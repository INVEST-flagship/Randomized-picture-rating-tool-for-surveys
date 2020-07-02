from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_url = 'https://somakysy.utu.fi'
admin.site.site_header = 'SOMA-kysely'
admin.site.site_title = 'SOMA-kysely'
admin.site.index_title = 'SOMA-kysely'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('survey.urls')),
    path('api/', include('raffle.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)