from django.contrib import admin
from accounts.models import CustomUser
from .models import Department, Issue, AuditLog

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Department)
admin.site.register(Issue)
admin.site.register(AuditLog)