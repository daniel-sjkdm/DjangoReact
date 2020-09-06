from django.urls import path
from . import views


app_name = 'posts'
urlpatterns = [
    path('', views.PostsListsAPI.as_view(), name='posts-list'),
    path('create/', views.PostCreateAPI.as_view(), name='post-create'),
]