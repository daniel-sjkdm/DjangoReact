from django.urls import path
from . import views



app_name = 'tags'
urlpatterns = [
    path('', views.TagListAPI.as_view(), name='tags-list'),
]
