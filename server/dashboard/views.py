from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Dashboard


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_dashboard(request):

    """
    Creates a new dashboard for the authenticated user.

    This view is accessed via a POST request and requires the user to be authenticated.
    Upon receiving a valid request, it creates a new Dashboard instance associated with the current user.

    Args:
        request (Request): The incoming HTTP request containing user authentication information.

    Returns:
        Response: A JSON response containing a success message and the ID of the newly created dashboard.
                  The response will have a status code of 201 (Created) if the dashboard is created successfully.
    """

    if request.method == 'POST':
        dashboard = Dashboard.objects.create(user=request.user)
        return Response({'message': 'Dashboard created successfully', 'id': dashboard.id}, status=status.HTTP_201_CREATED)