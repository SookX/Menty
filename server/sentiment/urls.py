from django.urls import path
from .views import santiment

urlpatterns = [
    path('dashboard/<int:dashboardId>/', santiment, name='santiment_create'),
]
