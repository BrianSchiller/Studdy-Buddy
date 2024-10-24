from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics, status
from .models import User, UserProgress, Word, Topic
from .serializers import WordSerializer
from django.http import JsonResponse


def check_user_exists(request, username):
    if User.objects.filter(username=username).exists():
        return JsonResponse({'exists': True})
    else:
        return JsonResponse({'exists': False})
    
@api_view(['POST'])
def update_user_progress(request, username):
    topic_id = request.data.get('topic_id')

    try:
        # Get the user by username
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

    try:
        user_progress = UserProgress.objects.get(user=user, topic_id=topic_id)
        user_progress.level += 1 
        user_progress.save()
        return Response({'message': 'Progress updated successfully.', 'level': user_progress.level}, status=status.HTTP_200_OK)
    except UserProgress.DoesNotExist:
        return Response({'message': 'User progress for this topic does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    

class WordListView(generics.ListAPIView):
    serializer_class = WordSerializer

    def get_queryset(self):
        topic_id = self.kwargs['topic_id']
        return Word.objects.filter(topic_id=topic_id)


class UserProgressListView(APIView):
    def get(self, request, username, *args, **kwargs):
        try:
            # Get the user by username
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        # Get progress for the user
        user_progress = UserProgress.objects.filter(user=user).select_related('topic')

        topics = Topic.objects.all()

        # Create missing UserProgress entries with level=0
        for topic in topics:
            UserProgress.objects.get_or_create(user=user, topic=topic, defaults={'level': 0})

        progress_data = [
            {
                'topic_id': progress.topic.id,
                'topic': progress.topic.name,
                'level': progress.level,
            } for progress in user_progress
        ]

        return Response(progress_data)

