from django.shortcuts import render
from .models import Cliente
from django.http import JsonResponse
from cadastro_jogos.models import Jogo  # Importando o modelo de Jogo

def site_django(request):
    sucesso = False
    erro_login = False
    usuario_logado_nome = request.session.get('usuario_logado_nome')

    # Verifica se o usuário quer deslogar
    if request.method == 'POST':
        if 'logout' in request.POST:
            request.session.flush()  # Limpa todos os dados da sessão
            usuario_logado_nome = None
        elif 'nome' in request.POST:  # Cadastro
            nome = request.POST.get('nome')
            email = request.POST.get('email')
            password = request.POST.get('password')
            telefone = request.POST.get('telefone') or 'Sem telefone'

            if password and email:
                novo_cliente = Cliente.objects.create(
                    nome=nome,
                    email=email,
                    password=password,
                    telefone=telefone
                )
                sucesso = True
                request.session['usuario_logado_nome'] = novo_cliente.nome
                usuario_logado_nome = novo_cliente.nome
        elif 'email' in request.POST and 'password' in request.POST:  # Login
            email = request.POST.get('email')
            password = request.POST.get('password')

            try:
                cliente = Cliente.objects.get(email=email, password=password)
                usuario_logado_nome = cliente.nome
                request.session['usuario_logado_nome'] = cliente.nome
            except Cliente.DoesNotExist:
                erro_login = True

    jogos = Jogo.objects.all()
    return render(request, 'site_django/pagina_inicial.html', {
        'sucesso': sucesso,
        'erro_login': erro_login,
        'usuario_logado_nome': usuario_logado_nome
    })


def api_jogos(request):
    jogos = Jogo.objects.all()
    data = [{
        'nome': jogo.nome,
        'descricao': jogo.descricao,
        'categoria': jogo.categoria.upper(),
        'imagem_url': jogo.imagem.url,
        'link_url': jogo.link if jogo.link else "",
    } for jogo in jogos]
    return JsonResponse(data, safe=False)