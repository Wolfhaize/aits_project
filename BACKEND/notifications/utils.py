import logging
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from .models import Notification
from SDPapp.models import Issue
from django.contrib.auth import get_user_model

# Set up logging
logger = logging.getLogger(__name__)

User = get_user_model()

def send_notification_email(notification, recipient_list):
    try:
        send_mail(
            subject=notification.title,
            message=notification.message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipient_list,
            fail_silently=True,
        )
        
        notification.sent_at = timezone.now()
        notification.save(update_fields=['sent_at'])
        logger.info(f"Email sent successfully to {recipient_list}")
        return True
    
    except Exception as e:
        logger.error(f"Failed to send email to {recipient_list}: {str(e)}", exc_info=True)
        return False

def notify_issue_submission(issue_id):
    try:
        issue = Issue.objects.get(id=issue_id)
        
        registrar = User.objects.filter(role='REGISTRAR').first() or User.objects.filter(is_staff=True).first()
        if not registrar or not registrar.email:
            logger.warning(f"No registrar found or registrar has no email for issue {issue_id}")
            return

        # Create notification for the registrar
        content_type = ContentType.objects.get_for_model(Issue)
        notification = Notification.objects.create(
            user=registrar,
            notification_type='other',
            priority='high',
            title=f"New Issue Submitted: {issue.title}",
            message=f"A new issue '{issue.title}' has been submitted by {issue.user.username}.",
            content_type=content_type,
            object_id=issue.id,
        )
        
        # Send email to the registrar
        send_notification_email(notification, [registrar.email])
        
    except Issue.DoesNotExist:
        logger.error(f"Issue with ID {issue_id} does not exist")
    except Exception as e:
        logger.error(f"Error in notify_issue_submission for issue {issue_id}: {str(e)}", exc_info=True)

def notify_issue_assignment(issue_id):
    try:
        issue = Issue.objects.get(id=issue_id)
        
        # Check if the issue is assigned to a lecturer
        if not issue.assigned_to or not issue.assigned_to.email:
            logger.warning(f"No assigned lecturer or lecturer has no email for issue {issue_id}")
            return

        # Create notification for the lecturer
        content_type = ContentType.objects.get_for_model(Issue)
        notification = Notification.objects.create(
            user=issue.assigned_to,
            notification_type='issue_assigned',
            priority='high',
            title=f"Issue Assigned: {issue.title}",
            message=f"You have been assigned to issue '{issue.title}'.",
            content_type=content_type,
            object_id=issue.id,
        )
        
        # Send email to the lecturer
        send_notification_email(notification, [issue.assigned_to.email])
        
    except Issue.DoesNotExist:
        logger.error(f"Issue with ID {issue_id} does not exist")
    except Exception as e:
        logger.error(f"Error in notify_issue_assignment for issue {issue_id}: {str(e)}", exc_info=True)

def notify_issue_resolution(issue_id):
    try:
        issue = Issue.objects.get(id=issue_id)
        
        content_type = ContentType.objects.get_for_model(Issue)
        notifications = []

        # Notify the student (issue creator)
        if issue.user and hasattr(issue.user, 'email') and issue.user.email:
            student_notification = Notification.objects.create(
                user=issue.user,
                notification_type='issue_resolved',
                priority='medium',
                title=f"Issue Resolved: {issue.title}",
                message=f"Your issue '{issue.title}' has been resolved. Resolution Details: {issue.resolution_details or 'No details provided.'}",
                content_type=content_type,
                object_id=issue.id,
            )
            notifications.append((student_notification, [issue.user.email]))
        else:
            logger.warning(f"No creator or creator has no email for issue {issue_id}")

        # Notify the registrar
        registrar = User.objects.filter(role='REGISTRAR').first()
        if registrar and registrar.email:
            registrar_notification = Notification.objects.create(
                user=registrar,
                notification_type='issue_resolved',
                priority='medium',
                title=f"Issue Resolved: {issue.title}",
                message=f"The issue '{issue.title}' has been resolved. Resolution Details: {issue.resolution_details or 'No details provided.'}",
                content_type=content_type,
                object_id=issue.id,
            )
            notifications.append((registrar_notification, [registrar.email]))
        else:
            logger.warning(f"No registrar found or registrar has no email for issue {issue_id}")

        # Send emails for all notifications
        for notification, recipient_list in notifications:
            send_notification_email(notification, recipient_list)
        
    except Issue.DoesNotExist:
        logger.error(f"Issue with ID {issue_id} does not exist")
    except Exception as e:
        logger.error(f"Error in notify_issue_resolution for issue {issue_id}: {str(e)}", exc_info=True)