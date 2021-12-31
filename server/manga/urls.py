from django.urls import path
from . import views

urlpatterns = [
    path('', views.getMangas, name="mangas"),
    path('<str:pk>/comments/', views.createMangaComment, name="create-comments"),
    path('top/', views.getTopMangas, name="top-manga"),
    path('<str:pk>/', views.getManga, name="manga"),
]