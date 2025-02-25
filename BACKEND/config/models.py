from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    ROLE_FOR_USERS = [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('registrar', 'Registrar'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_FOR_USERS)
    department = models.ForeignKey('Department', on_delete=models.CASCADE, null=True, blank=True)
    groups = models.ManyToManyField(
        Group,
        related_name='user_set',  # This is to be a unique name
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='user_set',  # This is to be a unique name
        blank=True,
    )
    
    def __str__(self):
        return self.username
    
class Department(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
        
class Issue(models.Model):
    CATEGORY_CHOICES=(
        ('open', 'Open'),
        ('missing_marks', 'Missing_marks'),
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
        
    )    
    
    
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='open')
    descriptions = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assigned_issues')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title