from django.contrib import admin
from .models import User, UserProgress, Topic, Word, Mistake, ExperimentGroup, Exam, ExamAnswer, ExamResult

admin.site.register(User)
admin.site.register(UserProgress)
admin.site.register(Topic)
admin.site.register(Word)
admin.site.register(Mistake)
admin.site.register(ExperimentGroup)
admin.site.register(Exam)
admin.site.register(ExamAnswer)
admin.site.register(ExamResult)

# Register your models here.
