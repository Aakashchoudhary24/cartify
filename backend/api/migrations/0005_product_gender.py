# Generated by Django 5.1.6 on 2025-03-10 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_product_brand_remove_product_colour_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], default='Unisex', max_length=10),
        ),
    ]
