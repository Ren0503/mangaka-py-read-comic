from django.db import models
import uuid

from manga.models import *

# Create your models here.


class Chapter(models.Model):
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    manga = models.ForeignKey(Manga, on_delete=models.SET_NULL, null=True)
    number = models.IntegerField(null=True, blank=True)
    url = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.number)


class ChapterImage(models.Model):
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(
        null=True, blank=True, default='/chapters/default.png', upload_to='chapters')
    page = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.page)
