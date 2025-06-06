from django.contrib import admin
from .models import Jogo, Categoria

@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    search_fields = ('nome', 'descricao',)
    filter_horizontal = ('categorias',)  # facilita seleção no admin

admin.site.register(Categoria)
