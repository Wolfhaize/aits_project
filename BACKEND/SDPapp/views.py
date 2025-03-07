
from rest_framework import generics
from .models import CustomUser , Department, Issue
from .serializers import CustomUserSerializer, DepartmentSerializer, IssueSerializer
from rest_framework.permissions import IsAuthenticated
# CustomUser  Views
class CustomUserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser .objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

class CustomUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser .objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated] 

# Department Views
class DepartmentListCreateView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]  
class DepartmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated] 

# Issue Views
class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]  

class IssueDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]  

