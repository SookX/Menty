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
from dashboard.models import Dashboard
from django.utils import timezone
from datetime import timedelta
import os
import numpy as np
from groq import Groq  
import json

url = "https://sentimentmodel-v1-0.onrender.com/predict/"

def get_classes():
    classes = []
    with open('sentiment/classes.txt', 'r') as f:
        for line in f:
            classes.append(line.strip())
    
    return classes


def prediction_to_dict(classes, prediction_array):
    i = 0
    scores = {}
    for class_ in classes:
        
        if(class_ == 'Personality disorder'):
            scores['personality_disorder_score'] = prediction_array[i]
        else:
            scores[class_.lower() + '_score'] = prediction_array[i]
        i += 1
    return scores

def help_text(prediction):
    api_key = os.getenv('GROQ_API_KEY')
    GROQ_KEY = os.environ.get('GROQ_API_KEY', api_key)

    
    client = Groq(
        api_key=GROQ_KEY
    )

    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": f"""The user is currently feeling {prediction['Predicted Class']}. As a compassionate and supportive mental health assistant, your goal is to provide personalized, actionable tips to help the user manage their emotions and improve their well-being. Respond with a warm and empathetic tone. Provide the advice in a structured list format, with each tip starting with a number, like this:
            **1. [First tip header]:**
            **2. [Second tip header]:**
            Do not add anything more.
            Make sure to offer specific activities or coping strategies that align with their emotional state""",
        }
    ],
    model="llama3-8b-8192",  
    )

    return chat_completion.choices[0].message.content

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

            predicted_Class = data.get('Predicted Class')
            prediction_Array = list(data.get('Prediction Array'))[0]


            current_date = timezone.now().date()
            
            
            
            # If there were previous sentiments

           #try:
            dashboard = Dashboard.objects.get(user=user)
            prevSentiment = Sentiment.objects.filter(dashboard = dashboard).first()
            classes = get_classes()

            data = dict(data)
            if prevSentiment is None:
                
                scores = prediction_to_dict(classes, prediction_Array)

                sentiment = Sentiment(
                    dashboard=dashboard,
                    emotion=emotion,
                    prediction=predicted_Class,
                    date=current_date,  
                    help_text=help_text(data)
                )

                for key, value in scores.items():
                    setattr(sentiment, key, value)

                sentiment.save()

                return Response({"message": "Sentiment created successfully", "data": sentiment.id}, status=status.HTTP_201_CREATED)
            
                
            else:
                scores = prediction_to_dict(classes, prediction_Array)
                
                # Get previous sentiment
                prevSentiment = Sentiment.objects.filter(dashboard=dashboard).order_by('-id').first()
                k = 0.97
                # Update the scores

                newScores = {}
                score_keys = list(scores.keys())
                for i in range(len(classes)):
                    score_key = score_keys[i]
                    current_score = getattr(prevSentiment, score_key) 
                    newScore = k * current_score + (1 - k) * scores[score_key]
                    newScores[score_key] = newScore
                
                sentiment = Sentiment(
                    dashboard=dashboard,
                    emotion=emotion,
                    prediction=predicted_Class,
                    date=current_date,  
                    help_text=help_text(data)
                )

                for key, value in newScores.items():
                    setattr(sentiment, key, value)

                sentiment.save()


            return Response({"message": "Sentiment created successfully", "sentiment": sentiment.id}, status=status.HTTP_201_CREATED)
#
        except requests.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == 'GET':

        dashboard = get_object_or_404(Dashboard, user = user)

        user_data = CustomUser.objects.filter(id=user.id).values('id', 'email', 'username', 'createdAt').first()

        sentiments = Sentiment.objects.filter(dashboard=dashboard).order_by('-date')[:30].values(
        'emotion', 
        'prediction', 
        'date', 
        'anxiety_score', 
        'bipolar_score', 
        'depression_score', 
        'normal_score', 
        'personality_disorder_score', 
        'stress_score', 
        'suicidal_score',
        'help_text'
        )

        response_data = {
            "user": user_data,
            "sentiments": list(sentiments)
        }

        return Response(response_data, status=status.HTTP_200_OK)
