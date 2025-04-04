from django.apps import AppConfig
#from django.db.utils import IntegrityError

class SdpappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "SDPapp"

   # def ready(self):
    #    """Ensure default departments exist and update them if needed."""
     #   from SDPapp.models import Department  # Avoid circular imports

      #  departments = ["Computer Science", "Business Administration"]
        
        for dept_name in departments:
            try:
                dept, created = Department.objects.get_or_create(name=dept_name)
                if created:
                    print(f"Created department: {dept_name}")
                else:
                    print(f"Department already exists: {dept_name}")
            except IntegrityError:
                print(f"Error creating department: {dept_name}")  # Handle potential conflicts