from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics, status
from .models import VocabWord, User
from .serializers import VocabWordSerializer, UserSerializer
from django.http import JsonResponse

# class UserLogin(generics.CreateAPIView):
#     serializer_class = UserSerializer

#     def post(self, request, *args, **kwargs):
#         username = request.data.get('username')
#         if not username:
#             return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

#         # Check if user already exists
#         user, created = User.objects.get_or_create(username=username)
#         return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

def check_user_exists(request, username):
    if User.objects.filter(username=username).exists():
        return JsonResponse({'exists': True})
    else:
        return JsonResponse({'exists': False})

@api_view(['GET'])
def vocab_list(request):
    # Fetch all vocab words from the database
    vocab_words = VocabWord.objects.all()
    serializer = VocabWordSerializer(vocab_words, many=True)
    return Response(serializer.data)
