from django.db import models
from PIL import Image

from datetime import date, datetime
import time
import os

def handleName(name):
    currentTime = datetime.now()
    file = int(time.mktime(currentTime.timetuple()))
    extension = os.path.splitext(name)
    filename = str(file) + extension[1]
    return filename

def image_path(instance, filename):
    return 'images/{0}/{1}'.format(date.today(), handleName(filename))

# def compressed_image_path(instance, filename):
#     return 'images/{0}/compressed/{1}'.format(date.today(), handleName(filename))

class imageCompressor(models.Model):
    created_At = models.DateTimeField(auto_now=True)
    image = models.ImageField(default='images/default.jpeg', upload_to=image_path)
    # compressImage = models.ImageField(blank=True, null=True, upload_to=image_path)

    def save(self):
        super().save()
        compressedImage = Image.open(self.image)
        compressedImage.save(self.image.path, quality=60)
    
    def __str__(self) -> str:
        return self.image.name
