from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from genres.models import Genres, Author
from genres.serializers import GenresSerializer
from manga.models import Manga
from manga.serializers import GenresDetailSerializer, AuthorDetailSerializer, MangaSerializer

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


@api_view(['GET'])
def searchAdvanced(request):
    try:
        query = request.query_params.getlist('keyword', '')

        for i in range(len(query)):
            query[i] = query[i].capitalize()

        mangas = Manga.objects.filter(genres__name__in=query).order_by('-createdAt').distinct()

        page = request.query_params.get('page')
        paginator = Paginator(mangas, 12)
        try:
            mangas = paginator.page(page)
        except PageNotAnInteger:
            mangas = paginator.page(1)
        except EmptyPage:
            mangas = paginator.page(paginator.num_pages)

        if page == None:
            page = 1

        serializer = MangaSerializer(mangas, many=True)
        return Response({'mangas': serializer.data, 'page': page, 'pages': paginator.num_pages})
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)
