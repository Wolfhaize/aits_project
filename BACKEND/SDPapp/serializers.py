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
        fields = ['id', 'username', 'student_number', 'first_name', 'last_name']

class IssueSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        write_only=True,
        default=serializers.CreateOnlyDefault(lambda: serializers.CurrentUserDefault()),
    )
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='LECTURER'),
        allow_null=True,
        required=False,
    )
    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        allow_null=True,
        required=False,
    )

    class Meta:
        model = Issue
        fields = [
            'id', 'title', 'category', 'status', 'description', 'course_code',
            'user', 'assigned_to', 'department', 'resolution_details',
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
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='LECTURER'),
        allow_null=True,
        required=False,
    )

    class Meta:
        model = Issue
        fields = ['id', 'assigned_to', 'status']
        read_only_fields = ['id']

    def validate(self, data):
        if 'assigned_to' in data and data['assigned_to'] and data.get('status') != 'assigned':
            data['status'] = 'assigned'
        return data