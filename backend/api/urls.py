from django.urls import path
from . import views
from .views import check_user_exists, update_user_progress, get_random_words, WordListView, UserProgressListView, TopicListView, get_exam, submit_exam


urlpatterns = [
    path('login/<str:username>/', check_user_exists, name='login'),
    path('update-progress/<str:username>/', update_user_progress, name='update_user_progress'),
    path('user-progress/<str:username>/', UserProgressListView.as_view(), name='user_progress'),
    path('words/<int:topic_id>/', WordListView.as_view(), name='word_list'),
    path('topics/', TopicListView.as_view(), name='topic_list'),
    path('random_words/<int:amount>/', get_random_words, name='random_words'),
    path('exam/<int:topic_id>/', get_exam, name='get_exam'),
    path('submit_exam/<int:exam_id>/<str:username>/', submit_exam, name='submit_exam'),
]
