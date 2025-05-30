from django.urls import path
from . import views


urlpatterns = [
    path('projeto2/', views.cadastro_cliente, name = 'site_django2')

]