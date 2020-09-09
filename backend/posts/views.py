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
        if request.user.has_perm("posts.add_post"):
            tags_data = [tag.lower() for tag in request.data.pop('tags').split(",")]
            tags = []
            for tag_title in tags_data:
                try:
                    tag = Tag.objects.create(title=tag_title)
                except:
                    tag = Tag.objects.filter(title__iexact=tag_title)[0]
                tags.append(tag.id)
            serializer = PostSerializer(data=request.data)
            if serializer.is_valid():
                post = serializer.save(author=request.user, tags=tags)
                return Response(
                    PostSerializer(post).data,
                    status=status.HTTP_201_CREATED
                )
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"message": "You're not a content creator"},
            status=status.HTTP_401_UNAUTHORIZED
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
        post.delete()
        return Response(
            {
                "message": "Post deleted successfully"
            }, 
            status=status.HTTP_200_OK
        )


class PostLikeAPI(APIView):
    def post(self, request, id):
        post = get_object_or_404(Post, id=id)
        if post.liked_by.filter(username__iexact=request.user):
            post.liked_by.remove(request.user)
        else:
            post.liked_by.add(request.user)   
        post.save()
        serializer = PostSerializer(post)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


        # http -f --auth-type=jwt  --auth="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6IlR5bGVyIiwiZXhwIjoxNTk5NjcxODExLCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTk5NjcxNTExfQ.b9QDFVQVE2oN1wFzeNVMZs-2ADhqZHOS7MZspDxekYk" post http://127.0.0.1:8000/api/posts/create/  title="test jwt" content="test jwt" tags="jwt, django"


