from django.urls import path
from .views import (
    CustomUserListCreateView,
    CustomUserDetailView,
    DepartmentListCreateView,
    DepartmentDetailView,
    IssueListCreateView,
    IssueDetailView,
    NotificationListCreateView,
    NotificationDetailView,
    AuditLogListCreateView,
    AuditLogDetailView,
)

urlpatterns = [
    path('users/', CustomUserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', CustomUserDetailView.as_view(), name='user-detail'),
    path('departments/', DepartmentListCreateView.as_view(), name='department-list-create'),
    path('departments/<int:pk>/', DepartmentDetailView.as_view(), name='department-detail'),
    path('issue/', IssueListCreateView.as_view(), name='issue-list-create'),
    path('issue/<int:pk>/', IssueDetailView.as_view(), name='issue-detail'),
    path('notifications/', NotificationListCreateView.as_view(), name='notification-list-create'),
    path('notifications/<int:pk>/', NotificationDetailView.as_view(), name='notification-detail'),
    path('auditlogs/', AuditLogListCreateView.as_view(), name='auditlog-list-create'),
    path('auditlogs/<int:pk>/', AuditLogDetailView.as_view(), name='auditlog-detail'),
]
