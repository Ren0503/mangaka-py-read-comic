from rest_framework import serializers
from chapter.serializers import ChapterSerializer
from genres.models import Author, Genres

from genres.serializers import AuthorSerializer, GenresSerializer
from .models import Manga, Review


class MangaSerializer(serializers.ModelSerializer):
    chapters = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Manga
        fields = '__all__'

    def get_chapters(self, obj):
        chapters = obj.chapter_set.all().order_by('-createdAt')
        serializer = ChapterSerializer(chapters, many=True)
        return serializer.data


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class MangaDetailSerializer(serializers.ModelSerializer):
    genres = GenresSerializer(many=True, read_only=True)
    author = serializers.SerializerMethodField(read_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)
    chapters = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Manga
        fields = '__all__'

    def get_author(self, obj):
        author = obj.author
        serializer = AuthorSerializer(author, many=False)
        return serializer.data

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

    def get_chapters(self, obj):
        chapters = obj.chapter_set.all()
        serializer = ChapterSerializer(chapters, many=True)
        return serializer.data
    

class GenresDetailSerializer(serializers.ModelSerializer):
    mangas = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Genres
        fields = '__all__'

    def get_mangas(self, obj):
        mangas = obj.manga_genres.all()
        serializer = MangaSerializer(mangas, many=True)
        return serializer.data


class AuthorDetailSerializer(serializers.ModelSerializer):
    mangas = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Author
        fields = '__all__'

    def get_mangas(self, obj):
        mangas = obj.manga_set.all()
        serializer = MangaSerializer(mangas, many=True)
        return serializer.data