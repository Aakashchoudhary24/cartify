# Generated by Django 5.1.6 on 2025-03-15 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_alter_customuser_groups_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='refresh_token_value',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
