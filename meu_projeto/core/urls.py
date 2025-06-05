from django.urls import path
from .views import homepage

urlpatterns = [
    
    path('core/', homepage, name = 'homepage')
]