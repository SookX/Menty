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