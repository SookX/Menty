from django.urls import path
from .views import sentiment

urlpatterns = [
    path('sentiment/', sentiment, name='santiment_create'),
]
