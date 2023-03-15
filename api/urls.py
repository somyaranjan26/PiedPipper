from django.urls import path
from .views import ImageCreateAPI

app_name = 'api'

urlpatterns = [
    path('', ImageCreateAPI.as_view(), name='imageupload'),
]