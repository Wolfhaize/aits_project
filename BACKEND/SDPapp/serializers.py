from rest_framework import serializers
from .models import Department, Issue
from accounts.models import CustomUser

class DepartmentSerializer(serializers.ModelSerializer):
    head = serializers.StringRelatedField()

    class Meta:
        model = Department
        fields = ['id', 'name', 'head']

class IssueSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role__in=['LECTURER', 'ACADEMIC_REGISTRAR']),
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