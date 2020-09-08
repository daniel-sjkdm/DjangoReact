from django.shortcuts import render, get_object_or_404
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


class TagAPI(APIView):
    def get(self, request, id):
        tag = get_object_or_404(Tag, id=id)
        serializer = TagSerializer(tag)
        return Response(
                serializer.data,
                status=status.HTTP_200_OK
        )


class TagUpdateAPI(APIView):
    def put(self, request, id):
        tag = get_object_or_404(Tag, id=id)
        serializer = TagSerializer(instance=tag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                    serializer.data, 
                    status=status.HTTP_200_OK
            )


class TagDeleteAPI(APIView):
    def delete(self, request, id):
        tag = get_object_or_404(Tag, id=id)
        tag.delete()
        return Response(
                {
                    "message": "Tag deleted successfully"
                },
                status = status.HTTP_200_OK
        )


class TagCreateAPI(APIView):
    def post(self, request):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED
            )
        return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
        )

