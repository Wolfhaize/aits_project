from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(
        max_length=50,
        choices=[
            ('issue_assigned', 'Issue Assigned'),
            ('issue_resolved', 'Issue Resolved'),
            ('reminder', 'Reminder'),
            ('other', 'Other'),
        ],
        default='other'
    )
    priority = models.CharField(
        max_length=20,
        choices=[
            ('low', 'Low'),
            ('medium', 'Medium'),
            ('high', 'High'),
        ],
        default='medium'
    )
    
    title = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    related_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f"Notification for {self.user.username}:{self.message}"
    
    def save(self, *args, **kwargs):
        # Auto-set title if not provided
        if not self.title:
            self.title = self.get_notification_type_display()
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['-created_at'] # Newest notifications first
        indexes = [
            models.Index(fields=['user', 'is_read']),
            models.Index(fields=['created_at']),
            models.Index(fields=['notification_type']),
            models.Index(fields=['priority']),
        ]