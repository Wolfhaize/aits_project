from rest_framework import serializers
from .models import CustomUser , Department, Issue 

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser 
        fields = ['id', 'username', 'email', 'role']

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description']

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields =['id','title','category', 'user', 'description', 'status','assigned_to', 'created_at', 'updated_at']

        
