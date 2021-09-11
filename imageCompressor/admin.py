from django.contrib import admin
from . import models

@admin.register(models.imageCompressor)
class ImageCompressorAdmin(admin.ModelAdmin):
    list_display = ['id',  'created_At', 'image']
