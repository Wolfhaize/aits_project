from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser , Department, Issue

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser 
        fields = ['username', 'email', 'role', 'password1', 'password2']

class DepartmentForm(forms.ModelForm):
    class Meta:
        model = Department
        fields = ['name', 'description']

class IssueForm(forms.ModelForm):
    class Meta:
        model = Issue
        fields = ['title', 'category', 'description', 'user', 'assigned_to']