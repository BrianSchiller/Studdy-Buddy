from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.username

# Topic Model
class Topic(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Word Model
class Word(models.Model):
    topic = models.ForeignKey(Topic, related_name='words', on_delete=models.CASCADE)
    spanish = models.CharField(max_length=100)
    english = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
    sentence = models.TextField()

    def __str__(self):
        return f"{self.spanish} - {self.english}"

# UserProgress Model
class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)

    class Meta:
        unique_together = ('user', 'topic')

    def __str__(self):
        return f"{self.user.username} - {self.topic.name} - Level {self.level}"