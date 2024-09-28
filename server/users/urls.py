from django.urls import path
from .views import register, login, user_details

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('user/<int:id>/', user_details, name='user_detail'),
]
