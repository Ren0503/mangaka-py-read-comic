# Generated by Django 4.0 on 2021-12-30 12:46

import chapter.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chapter', '0005_chapter_views'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapterimage',
            name='image',
            field=models.FileField(blank=True, default='/chapters/default.png', null=True, upload_to=chapter.models.get_file_path),
        ),
    ]
