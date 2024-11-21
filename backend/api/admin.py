from django.contrib import admin
from .models import User, UserProgress, Topic, Word, Mistake, ExperimentGroup

admin.site.register(User)
admin.site.register(UserProgress)
admin.site.register(Topic)
admin.site.register(Word)
admin.site.register(Mistake)
admin.site.register(ExperimentGroup)

# Register your models here.
