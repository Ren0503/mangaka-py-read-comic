from django.urls import path
from . import views

urlpatterns = [
    path('genres/', views.getAllGenres, name="genres-all"),
    path('genres/<str:pk>/', views.getDetailGenres, name="genres-detail"),
    path('author/<str:pk>/', views.getDetailAuthor, name="author-detail"),

    path('search/', views.searchAdvanced, name="search-all"),

]