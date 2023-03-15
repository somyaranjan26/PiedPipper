from django.db import models
from django.contrib.auth.models import User

from PIL import Image as IMG
from datetime import date
import os


def handleCompressedImageName(name):
    extension = os.path.splitext(name)
    filename = extension[0] + '_compressed' + extension[1]
    return filename

def compressedImagePath(instance, filename):
    return 'images/{0}/{1}/{2}/{3}'.format(
        instance.user, 
        date.today(), 
        instance.unique_id, 
        handleCompressedImageName(filename)
    )

QUANTITY_CHOICE = (
    (40, 40),
    (60, 60),
    (80, 80),
)

class Image(models.Model):
    unique_id = models.IntegerField(default=0000000)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='image')
    created_At = models.DateTimeField(auto_now=True)
    image = models.ImageField(blank=True, null=True, upload_to=compressedImagePath)
    quality = models.IntegerField(choices=QUANTITY_CHOICE, default=60)
    
    def save(self, *args, **kwargs):
        super(Image, self).save( *args, **kwargs)
        image = IMG.open(self.image)

        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")
        image.save(self.image.path, quality=self.quality)

    def __str__(self) -> str:
        return self.image.name

