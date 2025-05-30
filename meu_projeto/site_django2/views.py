from django.shortcuts import render
from .models import Cliente

# Create your views here.
def site_django(request): #Render já renderiza dentro da pasta templates
    return render(request, 'site_django2/pagina_inicial.html')

def cadastro_cliente(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if password and email:
            Cliente.objects.create(
                email=email,
                password=password,
            )
    return render(request, 'site_django2/pagina_inicial.html')