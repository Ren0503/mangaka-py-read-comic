# Generated by Django 4.0 on 2021-12-30 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chapter', '0004_rename_url_chapter_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='views',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
