from rest_framework import serializers
from .models import Post
from tags.models import Tag
from django.db import IntegrityError


# TODO
# - [ ] Fix the post serializer 
# tags field
# create a tag on the request itself


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        read_only=True,
        slug_field='username'
    )
    tags_helper = serializers.CharField(required=False, read_only=True)
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'content',
            'word_count',
            'author',
            'tags',
            'tags_helper'
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
        tags_helper = self.validated_data.get('tags_helper').split(',')
        for tag in tags_helper:
            tag = tag.lower()
            existing_tag_query = Tag.objects.filter(title__iexact=tag)
            if existing_tag_query:
                print(existing_tag_query[0])
                post.tags.add(existing_tag_query[0])
            else:
                post.tags.create(title=tag)
        post.save()
        return post

    