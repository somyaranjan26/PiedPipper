# Generated by Django 3.2.7 on 2021-09-10 18:38

from django.db import migrations, models
import imageCompressor.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='imageCompressor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(auto_now=True)),
                ('image', models.ImageField(default='images/default.jpeg', upload_to=imageCompressor.models.image_path)),
                ('compressImage', models.ImageField(default='images/default.jpeg', upload_to=imageCompressor.models.image_path)),
            ],
        ),
    ]
