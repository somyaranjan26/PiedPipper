from rest_framework import serializers
from .models import Image
import os

class ImageSerializer(serializers.ModelSerializer):

    image = serializers.ImageField()

    class Meta:
        model = Image
        fields = ['unique_id', 'created_At', 'user', 'quality' ,'image']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        name = os.path.split(instance.image.name)
        image = {
            "url": representation.pop("image"),
            "size": instance.image.size,
            "name": name[1],
        }
        representation['image'] = image
        return representation


