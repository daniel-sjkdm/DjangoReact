from rest_framework import serializers
from .models import Post
from tags.models import Tag
from django.db import IntegrityError




class PostSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        read_only=True,
        slug_field='username'
    )
    # tags = serializers.CharField()
    class Meta:
        model = Post
        fields = [
            'title',
            'content',
            'word_count',
            'author',
            'tags'
        ]

    def validate(self, data):
        content = data.get('content')   
        if len(content) > 500:
            raise serializers.ValidationError
        return data

    def save(self, *args, **kwargs):
        print("Trying to create the tag...")
        post = Post.objects.create(
            title=self.validated_data.get('title'),
            content=self.validated_data.get('content')
        )
        post.author = kwargs.get('author')
        word_count = len(self.validated_data.get('content'))
        post.word_count = word_count
        tags = self.validated_data.get('tags').split(',')
        print(tags)
        for tag in tags:
            tag = tag.lower()
            existing_tag_query = Tag.objects.filter(title__iexact=tag)
            if existing_tag_query:
                print(existing_tag_query[0])
                post.tags.add(existing_tag_query[0])
            else:
                post.tags.create(title=tag)
        post.save()
        return post