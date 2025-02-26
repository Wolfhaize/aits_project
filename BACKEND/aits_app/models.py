from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


# Create your models here.
class CustomUser (AbstractUser ):
    ROLE_FOR_USERS = [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('registrar', 'Registrar'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_FOR_USERS)
    department = models.CharField(max_length=100, null=True, blank=True)
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups', 
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',  
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class Department(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name
        
class Issue(models.Model):
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
    )    

    CATEGORY_CHOICES = (
        ('missing_marks', 'Missing Marks'),
        ('appeal', 'Appeal'),
        ('resolved', 'Resolved'),
        ('other', 'Other'),
    )  
    
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='open')
    description = models.TextField()  
    user = models.ForeignKey(CustomUser , on_delete=models.CASCADE)  
    reported_by = models.ForeignKey(CustomUser , on_delete=models.CASCADE, related_name='issues_reported')  # Clarified related_name
    assigned_to = models.ForeignKey(CustomUser , on_delete=models.SET_NULL, null=True, related_name='assigned_issues')  # Use CustomUser 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} - {self.get_status_display()}"