from django.db import models
from model_utils import FieldTracker

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.SlugField(
        max_length=10,
        unique=True,
        null=True,
        blank=True,
        help_text="Short identifier for the department, e.g., 'cs' for Computer Science."
    )
    head = models.ForeignKey(
        'accounts.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={'role': 'LECTURER'},
        help_text="The lecturer designated as head of this department.",
        related_name='headed_departments'  # This avoids conflict
    )
    
    def __str__(self):
        return f"{self.code.upper()} - {self.name}"

class Issue(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('assigned', 'Assigned'),
        ('resolved', 'Resolved'),
    ]
    CATEGORY_CHOICES = [
        ('missing_marks', 'Missing Marks'),
        ('appeal', 'Appeal'),
        ('corrections', 'Corrections'),
        ('other', 'Other'),
    ]
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=15, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    description = models.TextField()
    course_code = models.CharField(max_length=20)
    user = models.ForeignKey(
        'accounts.CustomUser',
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'STUDENT'},
        help_text="The student who logged this issue."
    )
    assigned_to = models.ForeignKey(
        'accounts.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_issues',
        limit_choices_to={'role': 'LECTURER'},  # Registrar resolves directly, doesn't get assigned
        help_text="The lecturer assigned to resolve this issue."
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="The department related to this issue."
    )
    resolution_details = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # New attachment field
    attachment = models.FileField(
        upload_to='issue_attachments/',
        null=True,
        blank=True,
        help_text="Supporting documents for this issue (e.g., transcript, exam paper)"
    )
    
    tracker = FieldTracker(fields=['assigned_to', 'status'])
    
    def __str__(self):
        return f"{self.title} ({self.course_code})"

class AuditLog(models.Model):
    ACTION_CHOICES = [
        ('created', 'Created'),
        ('assigned', 'Assigned'),
        ('resolved', 'Resolved'),
        ('updated', 'Updated'),
    ]
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='audit_logs')
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.CharField(max_length=200, blank=True)
    
    def __str__(self):
        return f"{self.action} on {self.issue} by {self.user}"