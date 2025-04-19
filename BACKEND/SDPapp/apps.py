from django.apps import AppConfig
from django.db.utils import IntegrityError

class SdpappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "SDPapp"

    def ready(self):
        """Ensure default departments exist with their codes and update them if needed."""
        from SDPapp.models import Department  # Avoid circular imports

        departments = {
            "Computer Science": "cs",
            "Information Systems": "is",
            "Information Technology": "it",
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

            """Ensure default departments exist and update them if needed."""
            from SDPapp.models import Department  # Avoid circular imports

            departments = ["Computer Science", "Business Administration"]
            
            for dept_name in departments:
                try:
                    dept, created = Department.objects.get_or_create(name=dept_name)
                    if created:
                        print(f"Created department: {dept_name}")
                    else:
                        print(f"Department already exists: {dept_name}")
                except IntegrityError:
                    print(f"Error creating department: {dept_name}")  # Handle potential conflicts
