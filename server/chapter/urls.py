from django.urls import path
from . import views

urlpatterns = [
    path('<str:pk>/', views.getChapter, name="chapter-detail"),
    path('by/<str:pk>/', views.getChaptersByManga, name="chapters-manga"),
]