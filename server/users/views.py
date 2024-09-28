from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def register(request):
    
    """
    Registers a new user with the provided email, username, and password.

    Args:
    - request (Request): The incoming HTTP request containing user registration data.

    Returns:
    - Response: A JSON response indicating success or failure of the registration process.
    """
    
    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')

    if not email or not username or not password:
        return Response({'error': 'Email, username, and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser(email=email, username=username, password=make_password(password))
    user.save()

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
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(email=email, password=password)
    if user is None:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }, status=status.HTTP_200_OK)

@api_view(['GET', 'PATCH', 'DELETE'])
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
