# Generated by Django 5.1.6 on 2025-03-14 11:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_customuser_address_customuser_phone_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='address',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='phone',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='profile_picture',
        ),
    ]
