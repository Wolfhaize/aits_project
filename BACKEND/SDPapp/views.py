
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CustomUser , Department, Issue
from .serializers import CustomUserSerializer, DepartmentSerializer, IssueSerializer
from notifications.models import Notification
import logging

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
            queryset = queryset.filter(status=status_filter)
        if assigned_to_filter:
            queryset = queryset.filter(lecturer_username=assigned_to_filter)
            
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
                logger.info(f"Issue '{issue.title}' assigned to {lecturer_username}")
                return Response(IssueSerializer(issue).data, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                logger.error(f"Lecturer {lecturer_username} not found")
                return Response({'detail': 'Lecturer not found!'}, status=status.HTTP_404_NOT_FOUND)
        
        elif action == 'resolve':
            issue.status = 'resolved'
            issue.save()
            
            Notification.objects.create(user=issue.student, message=f"Issue '{issue.title}' has been resolved.")
            logger.info(f"Issue '{issue.title}' resolved")
            return Response(IssueSerializer(issue).data, status=status.HTTP_200_OK)

        logger.error('Invalid action')
        return Response({'detail': 'Invalid action!'}, status=status.HTTP_400_BAD_REQUEST)
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
                return Response(IssueSerializer(issue).data, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist():
                return Response({'detail': 'Lecturer not found!'}, status=status.HTTP_404_NOT_FOUND)
        
        elif action == 'resolve':
            issue.status = 'resolved'
            issue.save()
            
            Notification.objects.create(user=issue.student, message=f"Issue '{issue.title}' has been resolved.")
            return Response(IssueSerializer(issue).data, status=status.HTTP_200_OK)
    
            return Response({'detail': 'Invaild action!'}, status=status.HTTP_400_BAD_REQUEST)
        

# Create a logger
logger = logging.getLogger(__name__)

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        logger.info('Listing all users')
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        logger.info('Creating a new user')
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        logger.info('Retrieving a user')
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        logger.info('Updating a user')
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        logger.info('Deleting a user')
        return super().destroy(request, *args, **kwargs)


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        logger.info('Listing all departments')
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        logger.info('Creating a new department')
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        logger.info('Retrieving a department')
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        logger.info('Updating a department')
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        logger.info('Deleting a department')
        return super().destroy(request, *args, **kwargs)



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
            
        logger.info('Filtering issues by status and assigned to')
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
                logger.info(f"Issue '{issue.title}' assigned to {lecturer_username}")
                return Response(IssueSerializer(issue).data, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist():
                logger.error(f"Lecturer {lecturer_username} not found")
                return Response({'detail': 'Lecturer not found!'}, status=status.HTTP_404_NOT_FOUND)
        
        elif action == 'resolve':
            issue.status = 'resolved'
            issue.save()
            
            Notification.objects.create(user=issue.student, message=f"Issue '{issue.title}' has been resolved.")
            logger.info(f"Issue '{issue.title}' resolved")
            return Response(IssueSerializer(issue).data, status=status.HTTP_200_OK)
    
        logger.error('Invalid action')
        return Response({'detail': 'Invaild action!'}, status=status.HTTP_400_BAD_REQUEST)
