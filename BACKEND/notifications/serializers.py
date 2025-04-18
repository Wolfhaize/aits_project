from rest_framework import serializers
from .models import Notification
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'notification_type', 'priority', 'title', 'message', 'is_read', 'created_at', 'sent_at', 'content_type', 'object_id', 'related_object']
        read_only_fields = ['user', 'created_at', 'sent_at', 'content_type', 'object_id', 'related_object'] 