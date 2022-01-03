from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from chapter.models import Chapter
from chapter.serializers import ChapterDetailSerializer, ChapterSerializer

from rest_framework import status

# Create your views here.

@api_view(['GET'])
def getChapter(request, pk):
    try:
        chapter = Chapter.objects.get(_id=pk)
        chapter.views += 1
        chapter.save()

        serializer = ChapterDetailSerializer(chapter, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def getChaptersByManga(request, pk):
    try:
        chapters = Chapter.objects.filter(manga__pk=pk)
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)

