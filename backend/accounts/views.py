from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login
from django.shortcuts import render
from .serializers import AccountSerializer, AccountLoginSerializer, AccountRegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status




class AccountAPI(APIView):
    def get(self, request):
        accounts = User.objects.all()
        serializer = AccountSerializer(instance=accounts, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class AccountRegisterAPI(APIView):
    def post(self, request):
        print(request.data)
        serializer = AccountRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
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
        if user:
            serializer = AccountLoginSerializer(user)
            return Response(
                {
                    "username": serializer.data,
                    "token": "some token here"
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
    pass