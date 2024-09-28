from django.urls import path
from .views import sentiment

urlpatterns = [
    path('dashboard/<int:dashboardId>/', sentiment, name='santiment_create'),
]
