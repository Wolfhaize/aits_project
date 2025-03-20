from rest_framework import serializers
from .models import Notification, AuditLog

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'is_read', 'created_at']
        read_only_fields = ['user', 'created_at'] 

class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = ['id', 'user', 'action', 'timestamp']
        read_only_fields = ['id', 'timestamp'] 