from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),

    path('add/<str:pk>/', views.addFavorite, name='favorites-add'),
    path('delete/<str:pk>/', views.deleteFavorite, name='favorites-delete'),
    path('my_favorites/', views.getMyFavorites, name='my_favorites'),
]
