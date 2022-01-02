from django.db import models
import uuid
from manga.models import *

# Create your models here.

import os


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('chapters', filename)


class Chapter(models.Model):
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    manga = models.ForeignKey(Manga, on_delete=models.SET_NULL, null=True)
    number = models.IntegerField(null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    views = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.name)


class ChapterImage(models.Model):
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL, null=True)
    image = models.FileField(
        null=True, blank=True, default='/chapters/default.png', upload_to=get_file_path)
    page = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.page)
