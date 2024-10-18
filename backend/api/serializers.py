from rest_framework import serializers
from .models import VocabWord, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class VocabWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VocabWord
        fields = ['word', 'translation', 'topic']