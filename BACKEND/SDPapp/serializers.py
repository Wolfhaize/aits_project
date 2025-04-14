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
    user = UserSerializer(read_only=True)
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='LECTURER'),  # Adjust if registrars allowed
        allow_null=True,
        required=False
    )
    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        allow_null=True,
        required=False
    )

    class Meta:
        model = Issue
        fields = ['id', 'title', 'category', 'status', 'description', 'course_code', 
                  'user', 'assigned_to', 'department', 'resolution_details', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

    def validate_status(self, value):
        valid_statuses = [choice[0] for choice in Issue.STATUS_CHOICES]
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Invalid status. Must be one of: {valid_statuses}")
        return value

    def validate(self, data):
        request = self.context.get('request')
        if not request or not hasattr(request.user, 'role'):
            return data

        user_role = request.user.role
        if user_role == 'LECTURER':
            if 'status' in data and data['status'] != 'resolved':
                raise serializers.ValidationError("Lecturers can only set status to 'resolved'.")
            if data.get('status') == 'resolved' and 'resolution_details' not in data:
                raise serializers.ValidationError("Resolution details are required when resolving an issue.")
        return data

class IssueAssignSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='LECTURER'),
        allow_null=True,
        required=False
    )

    class Meta:
        model = Issue
        fields = ['id', 'assigned_to', 'status']
        read_only_fields = ['id']

    def validate(self, data):
        if 'assigned_to' in data and data['assigned_to'] and data.get('status') != 'assigned':
            data['status'] = 'assigned'
        return data