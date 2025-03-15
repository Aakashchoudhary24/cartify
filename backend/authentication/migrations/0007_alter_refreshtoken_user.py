# Generated by Django 5.1.6 on 2025-03-15 09:33

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_customuser_refresh_token_value'),
    ]

    operations = [
        migrations.AlterField(
            model_name='refreshtoken',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='refresh_token', to=settings.AUTH_USER_MODEL),
        ),
    ]
