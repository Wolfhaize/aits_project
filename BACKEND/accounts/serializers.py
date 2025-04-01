from rest_framework import serializers
from .models import CustomUser, Token

class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)  # Add first_name field
    last_name = serializers.CharField(required=True)   # Add last_name field
    
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'role', 'first_name', 'last_name', 'student_number', 'lecturer_number', 'registrar_number']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'STUDENT'),
            first_name=validated_data['first_name'],  # Ensure first_name is passed
            last_name=validated_data['last_name'],    # Ensure last_name is passed
            student_number=validated_data.get('student_number'),
            lecturer_number=validated_data.get('lecturer_number'),
            registrar_number=validated_data.get('registrar_number'),
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class LogoutSerializer(serializers.Serializer):
    pass

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'student_number', 'lecturer_number', 'registrar_number']  # Include first_name and last_name

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'student_number', 'lecturer_number', 'registrar_number', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ['token', 'created_at', 'expires_at', 'user', 'is_used']
