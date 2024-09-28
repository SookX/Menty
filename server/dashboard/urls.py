from django.urls import path
from .views import create_dashboard

urlpatterns = [
    path('', create_dashboard, name='create_dashboard'),
]
