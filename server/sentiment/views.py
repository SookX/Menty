from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Dashboard
import requests
from .models import Sentiment
from django.shortcuts import get_object_or_404
from users.models import CustomUser
from sentiment.models import Sentiment

url = "https://sentimentmodel-v1-0.onrender.com/predict/"

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def sentiment(request):
    
    """
    Handles sentiment entries associated with a specific dashboard.

    This view allows users to either create a new sentiment entry or retrieve 
    user information and associated sentiments for a specified dashboard.

    For a POST request, the user must provide an `emotion` which will be stored 
    as part of the sentiment entry. The view verifies the existence of the 
    dashboard with the given ID before creating a new sentiment. The response 
    will include a success message and the ID of the newly created sentiment 
    if the operation is successful.

    For a GET request, the view retrieves user information related to the 
    specified dashboard and all sentiments linked to that dashboard. The 
    response will return the user data and a list of associated sentiments.

    Args:
        request (Request): The incoming HTTP request containing either 
                           the emotion data (for POST) or requesting 
                           information (for GET).
        dashboardId (int): The ID of the dashboard to which the sentiment 
                           is linked.

    Returns:
        Response: A JSON response containing:
            - For POST:
                - A success message and the ID of the newly created sentiment 
                  with a status code of 201 (Created) upon successful creation.
                - A 400 (Bad Request) error with an error message if the 
                  required emotion is missing.
                - A 404 (Not Found) error if the specified dashboard does not 
                  exist.
            - For GET:
                - A JSON object containing user information and a list of 
                  sentiments linked to the specified dashboard with a status 
                  code of 200 (OK).
    """
    user = request.user
    
    if request.method == 'POST':
        emotion = request.data.get('emotion')
        if not emotion:
            return Response({"error": "Emotion is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            response = requests.post(url, json={'text': emotion})

            data = response.json()
            Predicted_Class = data.get('Predicted Class')
            # score = data.get('score')

            try:
                dashboard = Dashboard.objects.get(user=user)

                sentiment = Sentiment.objects.create(
                    dashboard=dashboard,
                    emotion=emotion,
                    prediction=Predicted_Class,
                    score=1
                )

                return Response({"message": "Sentiment created successfully.", "sentiment_id": sentiment.id}, status=status.HTTP_201_CREATED)

            except Dashboard.DoesNotExist:
                return Response({"error": "Dashboard not found."}, status=status.HTTP_404_NOT_FOUND)

        except requests.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == 'GET':
        
        # dashboard = get_object_or_404(Dashboard, id = dashboardId)

        dashboard = get_object_or_404(Dashboard, user = user)

        user_data = CustomUser.objects.filter(id=user.id).values('id', 'email', 'username', 'createdAt').first()

        sentiments = Sentiment.objects.filter(dashboard=dashboard).values('emotion', 'prediction', 'score', 'date')

        response_data = {
            "user": user_data,
            "sentiments": list(sentiments)
        }

        return Response(response_data, status=status.HTTP_200_OK)
