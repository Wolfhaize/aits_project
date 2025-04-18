import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
from model_utils import FieldTracker
from SDPapp.models import Issue
from .utils import notify_issue_submission, notify_issue_assignment, notify_issue_resolution

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Issue)
def notify_user_on_issue_update(sender, instance, created, **kwargs):
    try:
        issue_id = instance.id
        
        if created:
            # New issue submitted by a student
            logger.debug(f"New issue created (ID: {issue_id}). Sending submission notification.")
            notify_issue_submission(issue_id)
        else:
            if hasattr(instance, 'tracker'):
                # Check if assigned_to changed (issue assigned to a lecturer)
                if instance.tracker.has_changed('assigned_to') and instance.assigned_to:
                    logger.debug(f"Issue {issue_id} assigned to {instance.assigned_to.username}. Sending assignment notification.")
                    notify_issue_assignment(issue_id)
            
                # Check if status changed to resolved
                if instance.tracker.has_changed('status') and instance.status == 'resolved':
                    logger.debug(f"Issue {issue_id} marked as resolved. Sending resolution notification.")
                    notify_issue_resolution(issue_id)
            else:
                logger.warning(f"Issue model doesn't have FieldTracker configured. Cannot track field changes for issue {issue_id}.")
    
    except Exception as e:
        logger.error(f"Error in notify_user_on_issue_update for issue {instance.id}: {str(e)}", exc_info=True)
        # Handle any other exceptions that may arise