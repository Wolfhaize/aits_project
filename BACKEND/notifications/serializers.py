from rest_framework import serializers
from .models import Notification, AuditLog

class NotificationSerializer(serializers.ModelSerializer):
    Class Meta:
        model = Notification
        fields = ['id', 'user', ' message', 'is_read', 'created_at']

class AuditLogSerializer(serializers.ModelSerializer):
    Class Meta:
        model = AuditLog
        fields = ['id', 'user', 'action' 'timestamp']
        read_only_fields = ['id', 'timestamp']