from django.contrib.auth.models import User
from django.shortcuts import render
from .serializers import AccountSerializer, AccountLoginSerialiazer, AccountRegisterSerializer
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
    pass


class AccountLogoutAPI(APIView):
    pass