from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from .models import Department, Issue, AuditLog
from accounts.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = [
            'id', 
            'username', 
            'email',
            'student_number', 
            'first_name', 
            'last_name',
            'full_name',
            'role'
        ]
        read_only_fields = fields


    def get_full_name(self, obj):
        return obj.get_full_name()

class DepartmentSerializer(serializers.ModelSerializer):
    head = UserSerializer(read_only=True)
    head_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role=CustomUser.Role.LECTURER),
        source='head',
        write_only=True,
        allow_null=True,
        required=False,
        help_text=_("ID of the lecturer to assign as department head")
    )
    
            


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
