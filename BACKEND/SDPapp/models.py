from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    USER_ROLES = [
        ('STUDENT', 'Student'),  # Role for students
        ('LECTURER', 'Lecturer'),  # Role for lecturers
        ('ADMIN', 'Administrator'),  # Role for administrators
    ]
    role = models.CharField(max_length=100, choices= USER_ROLES,)
    username =models.CharField(max_length=100,unique = True)    
   
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_group', 
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permission',  
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username + '' + decription
        

# Define the Department model
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Issue(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
    ] 

    CATEGORY_CHOICES = [
        ('missing_marks', 'Missing Marks'),
        ('appeal', 'Appeal'),
        ('resolved', 'Resolved'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='open')
    description = models.TextField()  
    user = models.ForeignKey(CustomUser , on_delete=models.CASCADE)  
    reported_by = models.ForeignKey(CustomUser , on_delete=models.CASCADE, related_name='issues_reported')  
    assigned_to = models.ForeignKey(CustomUser , on_delete=models.SET_NULL, null=True, related_name='assigned_issues')  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Notification(models.Model):
    Customuser = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    status = models.CharField(max_length=50)  # You can define choices if needed
    timestamp = models.DateTimeField(auto_now_add=True)
    read_status = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.username}: {self.message}"


class AuditLog(models.Model):
    action = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='audit_logs')
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='audit_logs')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action} by {self.user.username} on {self.issue.title} at {self.timestamp}"        