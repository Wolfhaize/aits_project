from rest_framework import serializers
from .models import CustomUser, Department, Issue, Token

class CustomUserSerializer(serializers.ModelSerializer):
    # Include fields for the user's registration
    password = serializers.CharField(write_only=True, required=False)
    student_number = serializers.CharField(allow_null=True, required=False)
    lecturer_number = serializers.CharField(allow_null=True, required=False)
    registrar_number = serializers.CharField(allow_null=True, required=False)
    role = serializers.ChoiceField(choices=['STUDENT', 'LECTURER', 'REGISTRAR'])
    first_name = serializers.CharField(allow_null=True, required=True)
    last_name = serializers.CharField(allow_null=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'role', 'password', 'first_name', 'last_name', 'student_number', 'lecturer_number', 'registrar_number']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        role = data.get('role')
        
        if role == 'STUDENT':
            if not data.get('student_number'):
                raise serializers.ValidationError("Student number is required for students.")
            # Remove unrelated fields
            data.pop('lecturer_number', None)
            data.pop('registrar_number', None)
            
        elif role == 'LECTURER':
            if not data.get('lecturer_number'):
                raise serializers.ValidationError("Lecturer number is required for lecturers.")
            data.pop('student_number', None)
            data.pop('registrar_number', None)
            
        elif role == 'ACADEMIC_REGISTRAR':
            if not data.get('registrar_number'):
                raise serializers.ValidationError("Registrar number is required for academic registrars.")
            data.pop('student_number', None)
            data.pop('lecturer_number', None)
            
        return data
    def create(self, validated_data):
        """
        Create a new user with hashed password.
        """
        email = validated_data.get('email')

        # Check if the email is already in use
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email is already in use.")

        # Remove 'username' from validated_data if it exists
        validated_data.pop('username', None)

        # Hash the password
        password = validated_data.pop('password')  # Remove password from validated_data
        user = CustomUser(**validated_data)  # Create the user without the password
        user.set_password(password)  # Hash the password and set it
        user.save()  # Save the user to the database

        return user
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description']

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ['id', 'title', 'category', 'user', 'student_number', 'description', 'status', 'assigned_to', 'created_at', 'updated_at']


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ["token", "created_at", "expires_at", "user_id", "is_used"]