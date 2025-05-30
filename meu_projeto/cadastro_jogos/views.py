from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import JogoForm
from .models import Jogo

@login_required
def cadastro_jogos(request):
    if request.method == 'POST':
        form = JogoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('cadastrar_jogo')
    else:
        form = JogoForm()
    return render(request, 'cadastro_jogos/cadastro.html', {'form': form})

def listar_jogos(request):
    jogos = Jogo.objects.all()
    return render(request, 'site_django/index.html', {'jogos': jogos})