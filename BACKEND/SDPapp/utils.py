from .models import AuditLog, Notification
from django.core.mail import send_mail

def log_audit(user, action, description=""):
    AuditLog.objects.create(user=user, actio=actionn, description=description)

def send_notification(recipient, subject, message):
    Notification.objects.create(recipient=recipient, message=message)
    send_mail(
        subject,
        message,
        'no-reply@aits.message.com',
        [recipient.email],
        fail_silently=False,
    )