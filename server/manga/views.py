from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from manga.models import Manga, Comment
from manga.serializers import MangaSerializer, MangaDetailSerializer

from rest_framework import status

# Create your views here.

# ----------------------------
# Guest
# ----------------------------


@api_view(['GET'])
def getMangas(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    mangas = Manga.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(mangas, 15)

    try:
        mangas = paginator.page(page)
    except PageNotAnInteger:
        mangas = paginator.page(1)
    except EmptyPage:
        mangas = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = MangaSerializer(mangas, many=True)
    return Response({'mangas': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopMangas(request):
    mangas = Manga.objects.all().order_by('-views')[0:5]
    serializer = MangaSerializer(mangas, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getManga(request, pk):
    try:
        manga = Manga.objects.get(_id=pk)
        manga.views += 1
        manga.save()

        serializer = MangaDetailSerializer(manga, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)

# ----------------------------
# User
# ----------------------------


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMangaComment(request, pk):
    try:
        user = request.user
        manga = Manga.objects.get(_id=pk)
        data = request.data

        comment = Comment.objects.create(
            user=user,
            manga=manga,
            name=user.first_name,
            body=data['body'],
        )

        return Response('Comment Added')
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)
