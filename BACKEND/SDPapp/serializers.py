from rest_framework import serializers
from .models import Issue, Department
from accounts.models import CustomUser


class DepartmentSerializer(serializers.ModelSerializer):
    head = serializers.StringRelatedField()

    class Meta:
        model = Department
        fields = ['id', 'name', 'head']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'student_number', 'first_name', 'last_name', 'email']

class IssueSerializer(serializers.ModelSerializer):
    # For responses
    user = UserSerializer(read_only=True)
    # For writes
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        source='user',
        write_only=True,
        default=serializers.CurrentUserDefault()
    )
    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='LECTURER'),
        source='assigned_to',
        write_only=True,
        allow_null=True,
        required=False
    )
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        source='department',
        write_only=True,
        allow_null=True,
        required=False
    )

    class Meta:
        model = Issue
        fields = [
            'id', 'title', 'category', 'status', 'description', 'course_code',
            'user', 'user_id', 'assigned_to', 'assigned_to_id', 
            'department', 'department_id', 'resolution_details',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['status', 'created_at', 'updated_at']
        extra_kwargs = {
            'resolution_details': {'required': False, 'allow_blank': True},
        }

    def validate_category(self, value):
        valid_categories = [choice[0] for choice in Issue.CATEGORY_CHOICES]
        if value not in valid_categories:
            raise serializers.ValidationError(f"Invalid category. Must be one of: {valid_categories}")
        return value

    def validate(self, data):
        request = self.context.get('request')
        user = data.get('user', request.user if request else None)

        if not user or user.role != 'STUDENT':
            raise serializers.ValidationError({"user": "Only students can create issues."})

        if request and request.user.role == 'LECTURER':
            if data.get('status') and data['status'] != 'resolved':
                raise serializers.ValidationError({"status": "Lecturers can only set status to 'resolved'."})
            if data.get('status') == 'resolved' and not data.get('resolution_details'):
                raise serializers.ValidationError({"resolution_details": "Required when resolving an issue."})

        return data

class IssueAssignSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='LECTURER'),
        source='assigned_to',
        write_only=True,
        allow_null=True,
        required=False
    )

    class Meta:
        model = Issue
        fields = ['id', 'assigned_to', 'assigned_to_id', 'status']
        read_only_fields = ['id']

    def validate(self, data):
        if 'assigned_to' in data and data['assigned_to'] and data.get('status') != 'assigned':
            data['status'] = 'assigned'
        return data
    
