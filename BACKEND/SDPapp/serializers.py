from rest_framework import serializers
from .models import Department, Issue
from accounts.models import CustomUser

class DepartmentSerializer(serializers.ModelSerializer):
    head = serializers.StringRelatedField()

    class Meta:
        model = Department
        fields = ['id', 'name', 'head']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'student_number', 'first_name', 'last_name']  # Include student_number

class IssueSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Use nested serializer for user

    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role__in=['LECTURER', 'REGISTRAR']),
        allow_null=True
    )
    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        allow_null=True
    )

    class Meta:
        model = Issue
        fields = ['id', 'title', 'category', 'status', 'description', 'course_code', 
                  'user', 'assigned_to', 'department', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at', 'status', 'assigned_to']
