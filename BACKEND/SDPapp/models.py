from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    head = models.ForeignKey(
        'accounts.CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={'role': 'LECTURER'},
        help_text="The lecturer designated as head of this department."
    )

    def __str__(self):
        return self.name

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
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
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
        limit_choices_to={'role__in': ['LECTURER', 'ACADEMIC_REGISTRAR']},
        help_text="The lecturer or registrar assigned to resolve this issue."
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="The department related to this issue."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.course_code})"

class AuditLog(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='audit_logs')
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=100)  # e.g., "Created", "Assigned", "Resolved"
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.TextField(blank=True)  # e.g., "Assigned to Lecturer X"

    def __str__(self):
        return f"{self.action} on {self.issue} by {self.user}"