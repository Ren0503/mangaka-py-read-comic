from rest_framework import serializers

from .models import Chapter, ChapterImage


class ChapterImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChapterImage
        fields = '__all__'


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'


class ChapterDetailSerializer(serializers.ModelSerializer):
    chapterImages = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Chapter
        fields = '__all__'

    def get_chapterImages(self, obj):
        images = obj.chapterimage_set.all()
        serializer = ChapterImageSerializer(images, many=True)
        return serializer.data
