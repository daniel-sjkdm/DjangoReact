from django.urls import path
from . import views



app_name = 'tags'
urlpatterns = [
    path('', views.TagListAPI.as_view(), name='tags-list'),
    path('<int:id>/', views.TagAPI.as_view(), name='tag-detail'),
    path('<int:id>/update/', views.TagUpdateAPI.as_view(), name='tag-update'),
    path('<int:id>/delete/', views.TagDeleteAPI.as_view(), name='tag-delete'),
    path('create/', views.TagCreateAPI.as_view(), name='tag-create')
]
