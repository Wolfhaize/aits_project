from rest_framework import viewsets, permissions
from .models import Notification, AuditLog
from .serializers import NotificationSerializer, AuditLogSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return notifications for the logged-in user
        return self.queryset.filter(user=self.request.user)

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Optionally filter logs for the logged-in user
        user = self.request.user
        if user.is_superuser:
            return AuditLog.objects.all()  # Admin can see all logs
        return AuditLog.objects.filter(user=user)  # Regular users see their own logs