# Generated by Django 4.0 on 2022-01-02 02:06

from django.db import migrations, models
import manga.models


class Migration(migrations.Migration):

    dependencies = [
        ('manga', '0004_review_remove_rating_manga_remove_rating_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='manga',
            name='image',
            field=models.FileField(blank=True, default='/manga/default.png', null=True, upload_to=manga.models.get_file_path),
        ),
    ]