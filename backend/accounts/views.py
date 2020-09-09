from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login
from django.shortcuts import render
from .serializers import AccountSerializer, AccountLoginSerializer, AccountRegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework import status


def create_token(user):
    payload = api_settings.JWT_PAYLOAD_HANDLER(user)
    return api_settings.JWT_ENCODE_HANDLER(payload)


class AccountAPI(APIView):
    def get(self, request):
        accounts = User.objects.all()
        serializer = AccountSerializer(instance=accounts, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class AccountRegisterAPI(APIView):
    permission_classes = []
    authentication_classes = []
    def post(self, request):
        serializer = AccountRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "user": AccountSerializer(user).data,
                    "token": create_token(user)
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class AccountLoginAPI(APIView):
    permission_classes = []
    authentication_classes = []
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user and user.is_active:
            serializer = AccountLoginSerializer(user)
            return Response(
                {
                    "username": serializer.data,
                    "token": create_token(user)
                },
                status=status.HTTP_200_OK
            )
        return Response(
            {
                "error": "The username/password is invalid"
            },
            status=status.HTTP_403_FORBIDDEN
        )


class AccountLogoutAPI(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        pass
