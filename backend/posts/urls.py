from django.urls import path
from . import views


app_name = 'posts'
urlpatterns = [
    path('', views.PostsListsAPI.as_view(), name='posts-list'),
    path('create/', views.PostsCreateAPI.as_view(), name='post-create'),
    path('<int:id>/', views.PostsDetailAPI.as_view(), name='post-detail')
]
