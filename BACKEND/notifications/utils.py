from django.core.mail import send_mail
from django.conf import settings
from .models import Notification
from SDPapp.models import Issue

@staticmethod
def send_notification_email(subject, message, recipient_list):
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list)
        
def notify_issue_update(issue_id):
    try:
        issue = Issue.objects.get(id=issue_id)
        
        subject = 'Issue Status Updated'
        message = f"Issue '{issue.title}' status has been updated to {issue.status}."
        recipient = issue.assigned_to.email if issue.assigned_to else None
        
        if recipient:
            Notification.send_notification_email(subject, message, recipient)
            Notification.objects.create(user=issue.assigned_to, message=message) #Create in-app notification
            
    except Issue.DoesNotExist:
        print(f"Issue does not exist!")