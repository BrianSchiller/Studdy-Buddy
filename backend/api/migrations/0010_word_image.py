# Generated by Django 4.1.13 on 2024-12-14 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0009_remove_word_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="word",
            name="image",
            field=models.TextField(default="missing"),
        ),
    ]
