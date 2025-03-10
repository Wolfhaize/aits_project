from django.contrib import admin
from .models import CustomUser, Department, Issue

# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'is_staff')
#     list_filter = ('is_active', 'is_staff', 'role')
#     search_fields = ('username', 'email', 'first_name', 'last_name')
    
#     fieldsets = (
#         (None, {
#             'fields': ('username', 'password')
#         }),
#         ('Personal Info', {
#             'fields': ('first_name', 'last_name', 'email', 'role')
#         }),
#         ('Permissions', {
#             'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
#         }),
#         ('Important Dates', {
#             'fields': ('last_login', 'date_joined'),
#         }),
#     )

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Department)
admin.site.register(Issue)