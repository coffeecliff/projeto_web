from django.shortcuts import render



def institucional(request): #Render já renderiza dentro da pasta templates
    return render(request, 'site_institucional/index.html')

