from django.contrib import admin
from .models import CustomUser

# Register the CustomUser model
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'role', 'is_active')  # Fields to display
    search_fields = ('username', 'email')  # Add search functionality
    list_filter = ('role', 'is_active')  # Add filters for role and active status