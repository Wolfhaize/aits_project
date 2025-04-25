from django.apps import AppConfig
from django.db.utils import IntegrityError
from django.db import connection

class SdpappConfig(AppConfig):
    """Ensure default departments exist with their codes and update them if needed."""
   
    default_auto_field = "django.db.models.BigAutoField"
    name = "SDPapp"

    def ready(self):
        from SDPapp.models import Department  # Avoid circular imports

        # Check if table exists before running logic
        if 'SDPapp_department' in connection.introspection.table_names():
            departments = {
                "Computer Science": "cs",
                "Information Systems": "is",
                "Information Technology": "it",
                "Business Administration": "ba"
            }

            for name, code in departments.items():
                try:
                    dept, created = Department.objects.get_or_create(
                        code=code,
                        defaults={"name": name}
                    )
                    if created:
                        print(f"✅ Created department: {name} ({code})")
                    else:
                        # Optionally update the name if it changed for an existing code
                        if dept.name != name:
                            dept.name = name
                            dept.save()
                            print(f"♻️ Updated department name for code '{code}' to '{name}'")
                        else:
                            print(f"✔️ Department already exists: {name} ({code})")
                except IntegrityError:
                    print(f"❌ Error creating or updating department: {name} ({code})")
