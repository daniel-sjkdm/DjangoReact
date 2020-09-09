from rest_framework import serializers
from .models import Post, PostLike
from tags.models import Tag
from django.db import IntegrityError


# TODO
# - [X] Fix the post serializer 
# tags field
# create a tag on the request itself
# Fixed: The tags are created on the 
# POST request view of the post 


class PostLikeSerializer(serializers.RelatedField):
    def to_representation(self, value):
        return { "id": value.id, "username": value.username }


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        read_only=True,
        slug_field='username'
    )
    liked_by = PostLikeSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'content',
            'word_count',
            'author',
            'tags',
            'likes',
            'liked_by'
        ]
        depth = 1
    def validate(self, data):
        content = data.get('content')   
        try:
            content_length = len(content)
            if len(content) > 500:
                raise serializers.ValidationError
        except TypeError:
            pass
        return data

    def save(self, *args, **kwargs):
        post = Post.objects.create(
            title=self.validated_data.get('title'),
            content=self.validated_data.get('content')
        )
        post.author = kwargs.get('author')
        word_count = len(self.validated_data.get('content'))
        post.word_count = word_count
        tags = kwargs.get('tags')
        for tag in tags:
            post.tags.add(tag)
        post.save()
        return post

    
