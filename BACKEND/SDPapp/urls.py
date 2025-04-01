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

class IssueAuditLogsView(generics.ListAPIView):
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        issue_id = self.kwargs['issue_id']
        issue = get_object_or_404(Issue, id=issue_id)
        
        # Permission checks
        if not (self.request.user.is_staff or 
                issue.user == self.request.user or 
                issue.assigned_to == self.request.user or
                (issue.department and issue.department.head == self.request.user)):
            raise PermissionDenied(_("You don't have permission to view these logs"))
        
        return AuditLog.objects.filter(issue=issue).select_related('user').order_by('-timestamp')
