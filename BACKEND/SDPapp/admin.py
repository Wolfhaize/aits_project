from django.contrib import admin
from .models import CustomUser, Department, Issue, Token

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Department)
admin.site.register(Issue)
admin.site.register(Token)