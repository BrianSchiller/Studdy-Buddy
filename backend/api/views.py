from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics, status
from .models import User, UserProgress, Word, Topic, ExperimentGroup, Mistake
from .serializers import WordSerializer, TopicSerializer
from django.http import JsonResponse
from collections import Counter
from random import shuffle


def check_user_exists(request, username):
    try:
        user = User.objects.get(username=username)  # Check if the user exists
        # Check if styles have been assigned for this user
        if not ExperimentGroup.objects.filter(user=user).exists():
            assign_topics_and_styles_balanced(user)  # Assign topics and styles if not assigned

        return JsonResponse({'exists': True})
    except User.DoesNotExist:
        return JsonResponse({'exists': False})


@api_view(['POST'])
def update_user_progress(request, username):
    topic_id = request.data.get('topic_id')
    mistakes_count = request.data.get('mistakes', 0) 

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

    try:
        # Fetch user progress for the given topic
        user_progress = UserProgress.objects.get(user=user, topic_id=topic_id)

        # Increment the user's level
        user_progress.level += 1
        user_progress.save()

        mistake = Mistake.objects.create(
            user_progress=user_progress,
            level=user_progress.level,
            mistakes_count=mistakes_count
        )

        return Response({
            'message': 'Progress updated successfully.',
            'level': user_progress.level,
            'mistakes': mistake.mistakes_count
        }, status=status.HTTP_200_OK)
    except UserProgress.DoesNotExist:
        return Response({'message': 'User progress for this topic does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    

class WordListView(generics.ListAPIView):
    serializer_class = WordSerializer

    def get_queryset(self):
        topic_id = self.kwargs['topic_id']
        return Word.objects.filter(topic_id=topic_id)
    

class TopicListView(generics.ListAPIView):
    serializer_class = TopicSerializer

    def get_queryset(self):
        return Topic.objects.all()


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
    

def assign_topics_and_styles_balanced(user):
    styles = ['B', 'I', 'S']
    topics = list(Topic.objects.all())[:3]
    style_counts = {topic.id: Counter({'B': 0, 'I': 0, 'S': 0}) for topic in topics}

    # Count current style assignments for each topic
    for group in ExperimentGroup.objects.all():
        print(group.topic.id)
        print(group.presentation_style)
        style_counts[group.topic.id][group.presentation_style] += 1
    
    print(style_counts)

    # Track which styles have already been assigned to the user
    assigned_styles = set()

    for topic in topics:
        # Find the least assigned style for this topic that hasn't been assigned to this user yet
        available_styles = [style for style in styles if style not in assigned_styles]
        
        # Get the least used style from the available ones
        least_assigned_style = min(available_styles, key=lambda s: style_counts[topic.id][s])

        # Assign the topic and least used style to the user
        ExperimentGroup.objects.create(user=user, topic=topic, presentation_style=least_assigned_style)
        UserProgress.objects.get_or_create(user=user, topic=topic, defaults={'level': 1})

        # Update the style count for the topic
        style_counts[topic.id][least_assigned_style] += 1

        # Mark this style as assigned to the user
        assigned_styles.add(least_assigned_style)


@api_view(['GET'])
def get_random_words(request, amount):
    # Get all words from the database
    words = list(Word.objects.all())  # Convert queryset to list to shuffle

    # Shuffle and select the first 'x' words
    shuffle(words)
    random_words = words[:amount]

    # Prepare the response data
    response_data = [
        {
            'id': word.id,
            'spanish': word.spanish,
            'english': word.english,
            'image': word.image.url if word.image else None,  # Ensure we handle cases where there's no image
            'sentence': word.sentence,
        }
        for word in random_words
    ]

    # Return the random words as JSON response
    return Response(response_data, status=status.HTTP_200_OK)