from django.db import models

# Create your models here.
class Cliente(models.Model):
    nome = models.CharField(max_length=15, default='Sem nome')
    email = models.EmailField(unique = True)
    password = models.CharField(max_length=128)
    telefone = models.CharField(max_length=12, default='Sem telefone')
