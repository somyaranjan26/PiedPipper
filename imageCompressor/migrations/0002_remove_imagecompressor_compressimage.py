# Generated by Django 3.2.7 on 2021-09-10 18:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('imageCompressor', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='imagecompressor',
            name='compressImage',
        ),
    ]