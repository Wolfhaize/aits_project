from django.contrib import admin
from .models import Notification, AuditLog
# Register your models here.# admin.py
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("user", "message", "is_read", "created_at")
    search_fields = ("user__username", "message")
    list_filter = ("is_read", "created_at")

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ("user", "action", "timestamp")
    search_fields = ("user__username", "action")
    list_filter = ("timestamp",)
