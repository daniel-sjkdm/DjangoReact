from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer
from tags.models import Tag



class PostsListsAPI(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class PostCreateAPI(APIView):
    def post(self, request):
        print(request.data)
        serializer = PostSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )