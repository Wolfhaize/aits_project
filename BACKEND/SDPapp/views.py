
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CustomUser , Department, Issue
from .serializers import CustomUserSerializer, DepartmentSerializer, IssueSerializer
from notifications.models import Notification

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        status_filter = self.request.query_params.get('status', None)
        assigned_to_filter = self.request.query_params.get('assigned_to', None)
        
        if status_filter:
            queryset = queryset.filter(status = status_filter)
        if assigned_to_filter:
            queryset = queryset.filter(lecturer_username = assigned_to_filter)
            
        return queryset
    
    def update(self, request, *args, **kwargs):
        issue = self.get_object()
        action = request.data.get('action')
        
        if action == 'assign':
            lecturer_username = request.data.get('lecturer')
            try:
                lecturer = CustomUser.objects.get(username=lecturer_username)
                issue.lecturer = lecturer
                issue.save()
                
                Notification.objects.create(user=lecturer, message=f"Issue '{issue.title}' has been assigned to you.")
                return Response(IssueSerializer(issue).data,, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist():
                return Response({'detail': 'Lecturer not found!'}, status=status.HTTP_404_NOT_FOUND)
        
        elif action == 'resolve':
            issue.status = 'resolved'
            issue.save()
            
            Notification.objects.create(user=issue.student, message=f"Issue '{issue.title}' has been resolved."))
            return Response(IssueSerializer(issue).data, status=status.HTTP_200_OK)
    
    return Response({'detail': 'Invaild action!'}, status=status.HTTP_400_BAD_REQUEST)