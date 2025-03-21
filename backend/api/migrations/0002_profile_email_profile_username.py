# Generated by Django 5.1.6 on 2025-03-16 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='username',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
