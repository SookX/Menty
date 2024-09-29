from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from django.shortcuts import get_object_or_404
from dashboard.models import Dashboard
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from google.oauth2 import id_token
from google.auth.transport import requests
from dotenv import load_dotenv
import os

load_dotenv()

@api_view(['POST'])
def register(request):
    
    """
    Registers a new user with the provided email, username, and password.
    And create dashboard related to the user.

    Args:
    - request (Request): The incoming HTTP request containing user registration data.

    Returns:
    - Response: A JSON response indicating success or failure of the registration process.
    """
    
    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')

    if not email or not username or not password:
        return Response({'error': 'Email, username, and password are required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(email=email).exists():
        return Response({'error': 'An account with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser(email=email, username=username, password=make_password(password))
    user.save()

    Dashboard.objects.create(user=user)

    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):

    """
    Authenticates a user with the provided email and password.

    Args:
    - request (Request): The incoming HTTP request containing user login credentials.

    Returns:
    - Response: A JSON response containing access and refresh tokens if authentication is successful, or an error message.
    """

    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(email=email, password=password)
    if user is None:
        return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }, status=status.HTTP_200_OK)

@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_details(request, id):

    """
    Retrieves, updates, or deletes a specific user based on the provided ID.

    Args:
    - request (Request): The incoming HTTP request.
    - id (int): The unique identifier of the user.

    Returns:
    - Response: A JSON response containing the user's email and username on GET, 
                updated username on PATCH, or an empty response on DELETE.
    """
    
    user = get_object_or_404(CustomUser, id=id)

    if request.method == 'GET':
        data = {
            'email': user.email,
            'username': user.username
        }
        return Response(data)
    
    if request.method == 'PATCH':
        username = request.data.get('username', None)
        if username:
            user.username = username
            user.save()
            return Response({'username': user.username})
        return Response({'error': 'Username not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user(request):

    """
    Retrieves a list of all users with their details.

    Args:
    - request (Request): The incoming HTTP request.

    Returns:
    - Response: A JSON response containing a list of users with their id, last login, email, username, and creation date.
    """

    if request.method == 'GET':
        data = CustomUser.objects.values('id', 'last_login', 'email', 'username', 'createdAt')
        return Response(list(data))


@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')
    
    idinfo = id_token.verify_oauth2_token(token, requests.Request(), os.getenv('GOOGLE_OAUTH2'))
    print(idinfo)
    user, created = CustomUser.objects.get_or_create(email=idinfo['email'], username = idinfo['name'])
    Dashboard.objects.get_or_create(user = user)
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }, status=status.HTTP_200_OK)
    