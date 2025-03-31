from django.db import models
from django.contrib.auth.models import AbstractUser , BaseUserManager

class CustomUserManager(BaseUserManager):
    """Custom manager for email-based user creation."""
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
        
        # No need to set student_number, lecturer_number, or registrar_number for superusers
        return self.create_user(email, password, **extra_fields)

class CustomUser (AbstractUser ):
    """Custom user model with role-based access and unique identifiers."""
    USER_ROLES = [
        ('STUDENT', 'Student'),
        ('LECTURER', 'Lecturer'),
        ('ACADEMIC_REGISTRAR', 'Academic Registrar'),
        ('ADMIN', 'Administrator'),
    ]
    email = models.EmailField(unique=True)
    username = None  
    role = models.CharField(max_length=100, choices=USER_ROLES, default='STUDENT')
    student_number = models.CharField(max_length=15, blank=True, null=True, unique=True)
    lecturer_number = models.CharField(max_length=15, blank=True, null=True, unique=True)
    registrar_number = models.CharField(max_length=15, blank=True, null=True, unique=True)

    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # Permission fields with custom related_name to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_users',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_users_with_permission',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def save(self, *args, **kwargs):
        """Validate role-specific fields."""
        if not self.is_superuser:
            if self.role == 'STUDENT' and not self.student_number:
                raise ValueError("Student number is required for students.")
            elif self.role == 'LECTURER' and not self.lecturer_number:
                raise ValueError("Lecturer number is required for lecturers.")
            elif self.role == 'ACADEMIC_REGISTRAR' and not self.registrar_number:
                raise ValueError("Registrar number is required for academic registrars.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} ({self.role})"

class Token(models.Model):
    """Token model for authentication or verification."""
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set the creation time
    expires_at = models.DateTimeField()
    user = models.ForeignKey(CustomUser , on_delete=models.CASCADE)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"Token {self.token} for {self.user}"