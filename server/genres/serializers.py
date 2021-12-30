from rest_framework import serializers

from manga.serializers import MangaSerializer
from .models import Genres, Author

class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


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