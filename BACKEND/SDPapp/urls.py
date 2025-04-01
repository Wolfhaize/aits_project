from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from django.utils.translation import gettext_lazy as _
from . import views
from .models import Issue, AuditLog
from .serializers import AuditLogSerializer

router = DefaultRouter()
router.register(r'departments', views.DepartmentViewSet, basename='department')
router.register(r'issues', views.IssueViewSet, basename='issue')
