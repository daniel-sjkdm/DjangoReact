from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer
from tags.models import Tag


# TODO:
# - [ ] Add a custom permission (user must belong to CONTENT_CREATOR group)



class PostsListsAPI(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class PostsCreateAPI(APIView):
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save(author=request.user)
            return Response(
                PostSerializer(post).data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class PostsDetailAPI(APIView):
    def get(self, request, id):
        post = get_object_or_404(Post, id=id)
        serializer = PostSerializer(post)
        return Response(
            serializer.data, 
            status=status.HTTP_200_OK
        )
    def put(self, request, id):
        post = get_object_or_404(Post, id=id)
        serializer = PostSerializer(instance=post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                PostSerializer(post).data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    def delete(self, request, id):
        post = get_object_or_404(Post, id=id)
        post.delete
        return Response(
            {
                "message": "Post deleted successfully"
            }, 
            status=status.HTTP_200_OK
        )