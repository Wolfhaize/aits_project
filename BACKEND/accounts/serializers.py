from rest_framework import serializers
from .models import CustomUser, Token
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from datetime import datetime
from SDPapp.models import Department

class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    department = serializers.IntegerField(required=False, allow_null=True)
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'role', 'first_name', 'last_name', 'student_number', 'lecturer_number', 'registrar_number','department']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_role(self, value):
        allowed_roles = ['STUDENT', 'LECTURER', 'REGISTRAR']
        if value not in allowed_roles:
            raise serializers.ValidationError(f"Invalid role. Allowed roles are: {', '.join(allowed_roles)}")
        return value

    def create(self, validated_data):
        department_id = validated_data.get('department')
        department = None

        # If department ID is provided, validate it
        if department_id:
            try:
                department = Department.objects.get(id=department_id)
            except Department.DoesNotExist:
                raise serializers.ValidationError(f"Department with ID {department_id} not found.")


        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'STUDENT'),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            student_number=validated_data.get('student_number'),
            lecturer_number=validated_data.get('lecturer_number'),
            registrar_number=validated_data.get('registrar_number'),
            department=department,
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password.")
        else:
            raise serializers.ValidationError("Both email and password are required.")
        data['user'] = user
        return data

class LogoutSerializer(serializers.Serializer):
    pass

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'student_number', 'lecturer_number', 'registrar_number']
        read_only_fields = ['email', 'role']

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

    def validate(self, data):
        if data['is_used']:
            raise serializers.ValidationError("This token has already been used.")
        if data['expires_at'] < datetime.now():
            raise serializers.ValidationError("This token has expired.")
        return data

class PasswordUpdateSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def validate(self, data):
        user = self.context['request'].user
        if not user.check_password(data['old_password']):
            raise serializers.ValidationError({"old_password": "Old password is incorrect."})
        return data

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user