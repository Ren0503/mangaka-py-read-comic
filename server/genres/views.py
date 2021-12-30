from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from genres.models import Genres, Author
from genres.serializers import GenresSerializer
from manga.serializers import GenresDetailSerializer, AuthorDetailSerializer

from rest_framework import status

# Create your views here.

# ----------------------------
# Guest
# ----------------------------


@api_view(['GET'])
def getAllGenres(request):
    genres = Genres.objects.all()
    serializer = GenresSerializer(genres, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getDetailGenres(request, pk):
    try:
        genre = Genres.objects.get(_id=pk)
        serializer = GenresDetailSerializer(genre, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def getDetailAuthor(request, pk):
    try:
        author = Author.objects.get(_id=pk)
        serializer = AuthorDetailSerializer(author, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)
