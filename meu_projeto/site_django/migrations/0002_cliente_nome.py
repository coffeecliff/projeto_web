# Generated by Django 4.2.11 on 2025-04-25 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('site_django', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='nome',
            field=models.CharField(default='Sem Nome', max_length=15),
        ),
    ]
