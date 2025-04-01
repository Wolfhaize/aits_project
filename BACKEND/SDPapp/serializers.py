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

    class Meta:
        model = Department
        fields = [
            'id', 
            'name', 
            'head',
            'head_id',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class AuditLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = AuditLog
        fields = [
            'id',
            'action',
            'details',
            'user',
            'timestamp',
            'previous_state',
            'new_state'
        ]
        read_only_fields = fields

class IssueSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(
            role__in=[CustomUser.Role.LECTURER, CustomUser.Role.REGISTRAR]
        ),
        source='assigned_to',
        write_only=True,
        allow_null=True,
        required=False,
        help_text=_("ID of the lecturer/registrar to assign this issue to")
    )