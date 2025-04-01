from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from django.http import JsonResponse 
from django.shortcuts import get_object_or_404
from accounts.models import CustomUser
from .models import Department, Issue, AuditLog
from .serializers import DepartmentSerializer, IssueSerializer
from notifications.models import Notification
import json
from django.utils.translation import gettext_lazy as _

# Department ViewSet
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all().order_by('name')
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return super().get_permissions()

# Issue ViewSet
class IssueViewSet(viewsets.ModelViewSet):
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'department', 'category', 'assigned_to']
    search_fields = ['title', 'description', 'course_code']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']


    def get_queryset(self):
        queryset = Issue.objects.select_related(
            'user', 'assigned_to', 'department'
        ).prefetch_related('audit_logs')
        
        if self.request.user.role == CustomUser.Role.STUDENT:
            return queryset.filter(user=self.request.user)
        elif self.request.user.role == CustomUser.Role.LECTURER:
            return queryset.filter(
                models.Q(assigned_to=self.request.user) |
                models.Q(department__head=self.request.user)
            )
        return queryset  # For registrar/admin to see all

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser() or permissions.IsLecturer()]
        return super().get_permissions()
    
    def perform_create(self, serializer):
        if self.request.user.role != CustomUser.Role.STUDENT:
            raise permissions.PermissionDenied(
                _("Only students can create issues.")
            )

        issue = serializer.save(user=self.request.user)

        # Create audit log with state snapshots
        AuditLog.objects.create(
            issue=issue,
            user=self.request.user,
            action="Created",
            details=_("Issue created"),
            new_state=self._get_issue_state(issue)
        )

        # Notify department head if exists
        if issue.department and issue.department.head:
            Notification.objects.create(
                user=issue.department.head,
                message=_("New issue '%(title)s' created by %(email)s") % {
                    'title': issue.title,
                    'email': self.request.user.email
                }
            )


    def perform_update(self, serializer):
        issue = self.get_object()
        old_status = issue.status
        old_state = self._get_issue_state(issue)
        
        serializer.save()
        updated_issue = serializer.instance
        
        if issue.status != old_status or old_state != self._get_issue_state(updated_issue):
            AuditLog.objects.create(
                issue=updated_issue,
                user=self.request.user,
                action="Updated",
                details=_("Status changed from '%(old)s' to '%(new)s'") % {
                    'old': old_status,
                    'new': updated_issue.status
                },
                previous_state=old_state,
                new_state=self._get_issue_state(updated_issue)
            )

def _get_issue_state(self, issue):
        """Helper to get JSON representation of issue state"""
        return {
            'status': issue.status,
            'assigned_to': str(issue.assigned_to) if issue.assigned_to else None,
            'resolution_notes': issue.resolution_notes,
            'last_updated': str(issue.updated_at)
        }

# Assign Issue View
class AssignIssueView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, issue_id):
        issue = get_object_or_404(
            Issue.objects.select_related('department'),
            id=issue_id
        )

        # Validate assignee
        assigned_to_id = request.data.get('assigned_to')
        if not assigned_to_id:
            return Response(
                {"detail": _("Assignee ID is required.")},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        issue = get_object_or_404(Issue, id=issue_id)
        assigned_to_id = request.data.get('assigned_to')
        assigned_to = get_object_or_404(
            CustomUser,
            id=assigned_to_id,
            role__in=['LECTURER', 'REGISTRAR']
        )
        
        issue.assigned_to = assigned_to
        issue.status = 'assigned'
        issue.save()
        
        AuditLog.objects.create(
            issue=issue,
            user=request.user,
            action="Assigned",
            details=f"Issue assigned to {assigned_to.email} by {request.user.email}"
        )
        Notification.objects.create(
            user=assigned_to,
            message=f"You have been assigned issue '{issue.title}' by {request.user.email}"
        )
        return Response(
            {"detail": "Issue assigned successfully."},
            status=status.HTTP_200_OK
        )
    
class ResolveIssueView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, issue_id):
        if request.user.role not in ['LECTURER', 'REGISTRAR', 'ADMIN']:
            return Response({"detail": "Only authorized users can resolve issues."}, status=403)
        issue = get_object_or_404(Issue, id=issue_id)
        issue.status = 'resolved'
        issue.save()
        AuditLog.objects.create(
            issue=issue,
            user=request.user,
            action="Resolved",
            details=f"Issue '{issue.title}' resolved by {request.user.email}"
        )
        Notification.objects.create(
            user=issue.user,  # Notify student
            message=f"Your issue '{issue.title}' has been resolved by {request.user.email}"
        )
        return Response({"detail": "Issue resolved successfully."}, status=200) 


