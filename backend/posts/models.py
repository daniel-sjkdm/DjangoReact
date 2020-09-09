from django.contrib.auth.models import User
from django.db import models
from tags.models import Tag


class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey("Post", on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)


class Post(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    content = models.CharField(max_length=200, blank=False)
    word_count = models.IntegerField(default=0, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post_author", null=True)
    tags = models.ManyToManyField(Tag)
    liked_by = models.ManyToManyField(User, related_name="post_user", blank=True, through=PostLike)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['title']


    def save(self, *args, **kwargs):
        self.word_count = len(self.content)
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title