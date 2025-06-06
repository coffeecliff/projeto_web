from django import forms
from .models import Jogo

class JogoForm(forms.ModelForm):
    class Meta:
        model = Jogo
        fields = ['nome', 'descricao', 'categorias', 'imagem', 'link']
        widgets = {
            'categorias': forms.CheckboxSelectMultiple  # ou forms.SelectMultiple
        }
