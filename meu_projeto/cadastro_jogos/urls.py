from django.urls import path
from .views import listar_jogos

urlpatterns = [
    path('', listar_jogos, name='site_django'),
]

