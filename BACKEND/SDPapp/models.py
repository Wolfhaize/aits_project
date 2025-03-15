from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    USER_ROLES = [
        ('STUDENT', 'Student'),  # Role for students
        ('LECTURER', 'Lecturer'),  # Role for lecturers
        ('ACADEMIC_REGISTRAR', 'Academic Registrar'),  # Role for Academic Registrar
        ('ADMIN', 'Administrator'),  # Role for administrators
    ]
    role = models.CharField(max_length=100, choices= USER_ROLES, default= 'Student')
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
        return self.username 
        

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
        ('resolved', 'Resolved'),
    ] 

    CATEGORY_CHOICES = [
        ('missing_marks', 'Missing Marks'),
        ('appeal', 'Appeal'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Open')
    description = models.TextField()  
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='assigned_issues')  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

        
