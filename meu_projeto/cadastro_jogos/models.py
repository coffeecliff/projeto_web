from django.db import models

class Jogo(models.Model):
    nome = models.CharField(max_length=100, default='None')
    descricao = models.TextField(default='None')
    categoria = models.CharField(max_length=15, default='None')
    imagem = models.ImageField(upload_to='jogos/')
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.nome