from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.username


class Topic(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Word(models.Model):
    topic = models.ForeignKey(Topic, related_name='words', on_delete=models.CASCADE)
    spanish = models.CharField(max_length=100)
    english = models.CharField(max_length=100)
    sentence = models.TextField()
    image = models.TextField(default="missing", null=True)

    def __str__(self):
        return f"{self.spanish} - {self.english}"


class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)

    class Meta:
        unique_together = ('user', 'topic')

    def __str__(self):
        return f"{self.user.username} - {self.topic.name} - Level {self.level}"
    

class Mistake(models.Model):
    user_progress = models.ForeignKey(UserProgress, on_delete=models.CASCADE, related_name='mistakes')
    level = models.IntegerField()
    mistakes_count = models.IntegerField(default=0)
    duration = models.FloatField(default=0)
    date_taken = models.DateTimeField(auto_now_add=True) 

    class Meta:
        unique_together = ('user_progress', 'level')

    def __str__(self):
        return f"{self.user_progress.user.username} - {self.user_progress.topic.name} - Level {self.level}: {self.mistakes_count} mistakes"


class ExperimentGroup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='experiment_groups')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='experiment_groups')
    presentation_style = models.CharField(max_length=1, choices=[('B', 'Basic'), ('I', 'Image'), ('S', 'Sentence')])

    class Meta:
        unique_together = ('user', 'topic')

    def __str__(self):
        return f"{self.user.username} - {self.topic.name}: {self.presentation_style}"


class Exam(models.Model):
    topic = models.ForeignKey(Topic, related_name='exams', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return f"Exam for {self.topic.name}"

class ExamAnswer(models.Model):
    exam = models.ForeignKey(Exam, related_name='answers', on_delete=models.CASCADE)
    question = models.TextField()
    answer = models.CharField(max_length=255)
    text = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Answer for: {self.question}"

class ExamResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, related_name='results', on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    duration = models.FloatField(default=0)
    date_taken = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"Result for {self.user.username} - {self.exam.topic.name} - Score: {self.score}"
