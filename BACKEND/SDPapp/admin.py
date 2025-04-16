from django.contrib import admin
from .models import Issue, Department, AuditLog

# Register the Department model
@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'head')  # Display these fields in the admin list view
    search_fields = ('name', 'head__username')  # Add search functionality for these fields

# Register the Issue model
@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'status', 'user', 'assigned_to', 'created_at')  # Fields to display
    list_filter = ('status', 'category', 'created_at')  # Add filters for these fields
    search_fields = ('title', 'description', 'user__username', 'assigned_to__username')  # Add search functionality
    readonly_fields = ('created_at', 'updated_at')  # Make these fields read-only

# Register the AuditLog model
@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'issue', 'user', 'action', 'timestamp', 'details')  # Fields to display in the list view
    list_filter = ('action', 'timestamp')  # Add filters for action and timestamp
    search_fields = ('issue__title', 'user__username', 'details')  # Add search functionality for these fields
    readonly_fields = ('timestamp',)  # Make the timestamp field read-only