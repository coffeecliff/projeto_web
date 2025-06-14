# Generated by Django 4.2.11 on 2025-04-30 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cadastro_jogos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='jogo',
            name='categoria',
            field=models.CharField(default='None', max_length=15),
        ),
        migrations.AlterField(
            model_name='jogo',
            name='descricao',
            field=models.TextField(default='None'),
        ),
        migrations.AlterField(
            model_name='jogo',
            name='imagem',
            field=models.ImageField(default='None', upload_to='jogos/'),
        ),
        migrations.AlterField(
            model_name='jogo',
            name='nome',
            field=models.CharField(default='None', max_length=100),
        ),
    ]
