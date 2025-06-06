from django.db import models


class Categoria(models.Model):
    nome = models.CharField(max_length=50)

    def __str__(self):
        return self.nome


class Jogo(models.Model):
    nome = models.CharField(max_length=100, default='None')
    descricao = models.TextField(default='None')
    categorias = models.ManyToManyField(Categoria)  # <-- alteração aqui
    imagem = models.ImageField(upload_to='jogos/')
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.nome
