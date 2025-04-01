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

    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        source='department',
        write_only=True,
        allow_null=True,
        required=False,
        help_text=_("ID of the related department")
    )

    audit_logs = AuditLogSerializer(many=True, read_only=True)
    is_resolved = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Issue
        fields = [
            'id',
            'title',
            'category',
            'status',
            'description',
            'course_code',
            'resolution_notes',
            'user',
            'assigned_to',
            'assigned_to_id',
            'department',
            'department_id',
            'created_at',
            'updated_at',
            'audit_logs',
            'is_resolved'
        ]
        read_only_fields = [
            'id',
            'user',
            'status',
            'created_at',
            'updated_at',
            'audit_logs',
            'is_resolved'
        ]
        extra_kwargs = {
            'description': {
                'help_text': _("Detailed description of the issue (max 1000 characters)")
            },
            'resolution_notes': {
                'help_text': _("Notes about how the issue was resolved"),
                'required': False,
                'allow_blank': True
            }
        }

    def validate_description(self, value):
        if len(value) > 1000:
            raise serializers.ValidationError(
                _("Description cannot exceed 1000 characters")
            )
        return value

    def validate(self, data):
        """
        Additional validation for issue creation/updating
        """
        if self.instance is None:  # Creating new issue
            if self.context['request'].user.role != CustomUser.Role.STUDENT:
                raise serializers.ValidationError(
                    _("Only students can create issues")
                )
        
        # Validate department assignment if provided
        if 'department' in data and data['department']:
            department = data['department']
            if 'assigned_to' in data and data['assigned_to']:
                assigned_to = data['assigned_to']
                if (assigned_to.role == CustomUser.Role.LECTURER and 
                    assigned_to != department.head):
                    raise serializers.ValidationError(
                        _("Can only assign to department head or registrars")
                    )
        
        return data

class IssueStatusUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(
        choices=Issue.Status.choices,
        help_text=_("New status for the issue")
    )
    resolution_notes = serializers.CharField(
        required=False,
        allow_blank=True,
        help_text=_("Required when resolving an issue")
    )

    def validate(self, data):
        if data.get('status') == Issue.Status.RESOLVED and not data.get('resolution_notes'):
            raise serializers.ValidationError(
                _("Resolution notes are required when resolving an issue")
            )
        return data

class IssueAssignmentSerializer(serializers.Serializer):
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(
            role__in=[CustomUser.Role.LECTURER, CustomUser.Role.REGISTRAR]
        ),
        help_text=_("ID of the lecturer/registrar to assign this issue to")
    )