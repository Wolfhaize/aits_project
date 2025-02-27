
from rest_framework import generics
from .models import CustomUser , Department, Issue
from .serializers import CustomUserSerializer, DepartmentSerializer, IssueSerializer

# CustomUser  Views
class CustomUserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser .objects.all()
    serializer_class = CustomUserSerializer

class CustomUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser .objects.all()
    serializer_class = CustomUserSerializer

# Department Views
class DepartmentListCreateView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

# Issue Views
class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class IssueDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer