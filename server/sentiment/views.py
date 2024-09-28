from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Dashboard
import requests
from .models import Sentiment

url = ""

@api_view(['POST'])
def santiment(request, dashboardId):
    
    """
    Creates a new sentiment entry associated with a specified dashboard.

    This view is accessed via a POST request. It requires the user to provide an emotion,
    which will be stored as part of the sentiment entry. The endpoint expects a valid 
    dashboard ID in the URL and checks for the existence of the corresponding dashboard.

    Args:
        request (Request): The incoming HTTP request containing the emotion data.
        dashboardId (int): The ID of the dashboard to which the sentiment is linked.

    Returns:
        Response: A JSON response containing a success message and the ID of the newly created sentiment.
                  The response will have a status code of 201 (Created) if the sentiment is created successfully.
                  If the emotion is missing, the response will return a 400 (Bad Request) error with an error message.
                  If the specified dashboard does not exist, a 404 (Not Found) error will be returned.
    """

    
    if request.method == 'POST':
        emotion = request.data.get('emotion')
        if not emotion:
            return Response({"error": "Emotion is required."}, status=status.HTTP_400_BAD_REQUEST)
        # try:
        #     response = requests.post(url, json={'emotion': emotion})

        #     if response.status_code == 200:
        #         data = response.json()
        #         prediction = data.get('prediction')
        #         score = data.get('score')

        try:
            dashboard = Dashboard.objects.get(id=dashboardId)

            sentiment = Sentiment.objects.create(
                dashboard=dashboard,
                emotion=emotion,
                prediction="Anxiety",
                score=1
            )

            return Response({"message": "Sentiment created successfully.", "sentiment_id": sentiment.id}, status=status.HTTP_201_CREATED)

        except Dashboard.DoesNotExist:
            return Response({"error": "Dashboard not found."}, status=status.HTTP_404_NOT_FOUND)

        #     else:
        #         return Response({"error": "Failed to get response from the sentiment analysis service."}, status=response.status_code)

        # except requests.RequestException as e:
        #     return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)