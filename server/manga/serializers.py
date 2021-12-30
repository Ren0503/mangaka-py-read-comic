from rest_framework import serializers
from chapter.serializers import ChapterSerializer

from genres.serializers import AuthorSerializer, GenresSerializer
from .models import Manga, Comment


class MangaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manga
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class MangaDetailSerializer(serializers.ModelSerializer):
    genres = GenresSerializer(many=True, read_only=True)
    author = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    chapters = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Manga
        fields = '__all__'

    def get_author(self, obj):
        author = obj.author
        serializer = AuthorSerializer(author, many=False)
        return serializer.data

    def get_comments(self, obj):
        comments = obj.comment_sel.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data

    def get_chapters(self, obj):
        chapters = obj.chapter_set.all()
        serializer = ChapterSerializer(chapters, many=True)
        return serializer.data
    