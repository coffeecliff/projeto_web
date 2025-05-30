from django.shortcuts import render
from datetime import datetime
from zoneinfo import ZoneInfo



def homepage(request):
    fusohorario = ZoneInfo("America/Sao_Paulo")
    hora_atual = datetime.now(fusohorario).hour
    hora_completa = datetime.now(fusohorario)
    hora_formatada = hora_completa.strftime("%H:%M:%S")

    if hora_atual < 12:
        saudacao = "Bom Dia"
    elif hora_atual < 18:
        saudacao = "Boa Tarde"
    else:
        saudacao = "Boa Noite"


    contexto = {
        'nome': 'Pedrão', 
        'saudacao': saudacao,
        'hora': hora_completa
        }
    
    return render(request, 'core/index.html', contexto)

