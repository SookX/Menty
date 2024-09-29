from django.urls import path
from .views import register, login, user_details, user, google_login

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('user/<int:id>/', user_details, name='user_detail'),
    path('user/', user, name='name'),
    path('google-login/', google_login)
]
