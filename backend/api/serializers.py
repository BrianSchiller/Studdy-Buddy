from rest_framework import serializers
from .models import User, Word

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['id', 'spanish', 'english', 'image', 'sentence']
