from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)
    
class CustomUser(AbstractUser):
    USER_ROLES = [
        ('STUDENT', 'Student'),  # Role for students
        ('LECTURER', 'Lecturer'),  # Role for lecturers
        ('ACADEMIC_REGISTRAR', 'Academic Registrar'),  # Role for Academic Registrar
        ('ADMIN', 'Administrator'),  # Role for administrators
    ]
    email = models.EmailField(unique=True)
    username = None
    role = models.CharField(max_length=100, choices= USER_ROLES, default= 'STUDENT')
    first_name =models.CharField(max_length=100, blank=True, null=True)
    last_name =models.CharField(max_length=100, blank=True, null=True)
    student_number = models.CharField(max_length=15, blank=True, null=True)  # Add student_number
    lecturer_number = models.CharField(max_length=15, blank=True, null=True)  # Add lecturer_number
    registrar_number = models.CharField(max_length=15, blank=True, null=True)  # Add registrar_number    
    
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'  # Use email as the unique identifier
    REQUIRED_FIELDS = []  # No username field required
   
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
        return self.email
 
        

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
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Link to CustomUser
    student_number = models.CharField(max_length=15, blank=True, null=True)  # Add student_number
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='assigned_issues')  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title  


class Token(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    user_id = models.IntegerField()
    is_used = models.BooleanField(default=False)
    
    
    def __str__(self) -> str:
        return self.name

        
