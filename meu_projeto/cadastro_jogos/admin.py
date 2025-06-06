from django.contrib import admin
from .models import Jogo

@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    search_fields = ('nome', 'descricao', 'categoria')