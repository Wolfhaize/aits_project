from rest_framework import serializers
from .models import CustomUser , Department, Issue

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser 
        fields = ['id','Password', 'role'] 

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id','description']

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields =['id','category', 'user', 'priority_level', 'description', 'status','assigned_to', 'created_at', 'updated_at']
        
