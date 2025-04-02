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

# Department ViewSet
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

# Issue ViewSet
class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'department', 'category']

    def get_queryset(self):
        if self.request.user.role == 'STUDENT':
            return Issue.objects.filter(user=self.request.user)
        return Issue.objects.all() # For registrar to see and filter

    def perform_create(self, serializer):
        """Restrict issue creation to students and log it."""
        if self.request.user.role != 'STUDENT':
            return Response(
                {"detail": "Only students can create issues."},
                status=status.HTTP_403_FORBIDDEN
            )
        issue = serializer.save(user=self.request.user)
        AuditLog.objects.create(
            issue=issue,
            user=self.request.user,
            action="Created",
            details=f"Issue '{issue.title}' created by {self.request.user.email}"
        )
        if issue.department and issue.department.head:
            Notification.objects.create(
                user=issue.department.head,
                message=f"New issue '{issue.title}' created by {self.request.user.email}"
            )

    def perform_update(self, serializer):
        issue = self.get_object()
        old_status = issue.status
        serializer.save()
        if issue.status != old_status:
            AuditLog.objects.create(
                issue=issue,
                user=self.request.user,
                action="Status Updated",
                details=f"Status changed from '{old_status}' to '{issue.status}' by {self.request.user.email}"
            )

# Assign Issue View
class AssignIssueView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, issue_id):
        if request.user.role not in ['LECTURER', 'REGISTRAR', 'ADMIN']:
            return Response(
                {"detail": "Only lecturers, registrars, or admins can assign issues."},
                status=status.HTTP_403_FORBIDDEN
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