from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.username

class VocabWord(models.Model):
    word = models.CharField(max_length=100)
    translation = models.CharField(max_length=100)
    topic = models.CharField(max_length=50)  # e.g., Food, Sports
    
    def __str__(self):
        return self.word
