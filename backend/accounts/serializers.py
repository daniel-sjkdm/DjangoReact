from django.contrib.auth.models import User
from rest_framework import serializers



class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email'
        ]



class AccountLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
        ]


class AccountRegisterSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False) 
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password'
        ]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
