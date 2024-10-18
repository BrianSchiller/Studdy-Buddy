from django.urls import path
from . import views
from .views import check_user_exists


urlpatterns = [
    path('login/<str:username>/', check_user_exists, name='login'),
    path('vocab/', views.vocab_list),  # List all vocabulary words
]
