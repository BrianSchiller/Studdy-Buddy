# Generated by Django 4.1.13 on 2024-12-09 12:01

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_exam_examresult_examanswer"),
    ]

    operations = [
        migrations.AddField(
            model_name="mistake",
            name="date_taken",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="mistake",
            name="duration",
            field=models.FloatField(default=0),
        ),
    ]
