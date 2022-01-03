from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from manga.models import Manga, Review
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
    paginator = Paginator(mangas, 12)

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
def createMangaReview(request, pk):
    user = request.user
    manga = Manga.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = manga.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Manga already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            manga=manga,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = manga.review_set.all()
        manga.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        manga.rating = total / len(reviews)
        manga.save()

        return Response('Review Added')