from django.urls import path
from . import views


app_name = 'posts'
urlpatterns = [
    path('', views.PostsListsAPI.as_view(), name='posts-list'),
    path('create/', views.PostCreateAPI.as_view(), name='post-create'),
]



"""
http -f post http://localhost:8000/api/accounts/register/ username="Kratos" password="hello world" confirm_password="hello world"
"""