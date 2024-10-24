from django.contrib import admin
from .models import User, UserProgress, Topic, Word

admin.site.register(User)
admin.site.register(UserProgress)
admin.site.register(Topic)
admin.site.register(Word)

# Register your models here.
