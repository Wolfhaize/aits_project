from django.urls import path
from .views import (
    CustomUserListCreateView,
    CustomUserDetailView,
    DepartmentListCreateView,
    DepartmentDetailView,
    IssueListCreateView,
    IssueDetailView,
   
)

urlpatterns = [
    path('users/', CustomUserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', CustomUserDetailView.as_view(), name='user-detail'),
    path('departments/', DepartmentListCreateView.as_view(), name='department-list-create'),
    path('departments/<int:pk>/', DepartmentDetailView.as_view(), name='department-detail'),
    path('issue/', IssueListCreateView.as_view(), name='issue-list-create'),
    path('issue/<int:pk>/Notificati', IssueDetailView.as_view(), name='issue-detail'),
   
]
