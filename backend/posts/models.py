from django.contrib.auth.models import User
from django.db import models



class Tag(models.Model):
    title = models.CharField(max_length=20, null=False)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    content = models.CharField(max_length=200, blank=False)
    word_count = models.IntegerField(default=0, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    tags = models.ManyToManyField(Tag)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title