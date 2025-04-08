from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Notification
from SDPapp.models import Issue

@receiver(post_save, sender=Issue)
def notify_user_on_issue_update(sender, instance, created, **kwargs):
    if not created:
        subject = 'Issue Status Updated'
        message = f"Issue '{instance.title}' status has been updated to {instance.status}."

        if instance.assigned_to:
            recipient_email = instance.assigned_to.email
            send_mail(subject, message, settings.EMAIL_HOST_USER, [recipient_email])

        Notification.objects.create(user=instance.assigned_to, message=message) #This creates in-app notifications