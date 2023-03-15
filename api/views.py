from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ImageSerializer

class ImageCreateAPI(CreateAPIView):
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        
        serializer = ImageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

