# Generated by Django 4.0 on 2021-12-30 07:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('manga', '0001_initial'),
        ('chapter', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='manga',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='manga.manga'),
        ),
    ]
