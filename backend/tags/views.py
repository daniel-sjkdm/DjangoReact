from django.shortcuts import render
from .models import Tag
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import TagSerializer



class TagListAPI(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(
            serializer.data, 
            status=status.HTTP_200_OK
        )