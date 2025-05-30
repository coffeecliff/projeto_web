from django.urls import path
from . import views

urlpatterns = [
    path('projeto/', views.site_django, name='site_django'),
    path('projeto/api/jogos/', views.api_jogos, name='api_jogos'),
]