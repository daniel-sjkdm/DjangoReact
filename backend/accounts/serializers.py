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



class AccountLoginSerialiazer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email'
        ]



class AccountRegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50, required=True)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError
        else:
            return data

    def create(self, validated_data):
        print("Second")
        print(validated_data)
        validated_data.pop('confirm_password', None)
        print(validated_data)  
        return User.objects.create_user(**validated_data)