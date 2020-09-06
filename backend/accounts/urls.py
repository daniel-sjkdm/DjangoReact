from django.urls import path
from . import views


app_name = 'accounts'
urlpatterns = [
    path('', views.AccountAPI.as_view(), name='accounts'),
    path('register/', views.AccountRegisterAPI.as_view(), name='register'),
    # path('login/', views.AccountLoginAPI.as_view(), name='login'),
    # path('logout/', views.AccountLogoutAPI.as_view(), name='logout'),
]