# Generated by Django 5.1.7 on 2025-03-31 17:40

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SDPapp', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='assigned_to',
            field=models.ForeignKey(blank=True, help_text='The lecturer or registrar assigned to resolve this issue.', limit_choices_to={'role__in': ['LECTURER', 'REGISTRAR']}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assigned_issues', to=settings.AUTH_USER_MODEL),
        ),
    ]
