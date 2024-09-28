from django.db import models
from dashboard.models import Dashboard

class Sentiment(models.Model):
    dashboard = models.ForeignKey(Dashboard, on_delete=models.CASCADE, related_name="sentiment_dash", null=False)
    emotion = models.CharField(max_length=1000)
    prediction = models.CharField(max_length=20,
        choices=[
            ('Anxiety', 'Anxiety'),
            ('Bipolar', 'Bipolar'),
            ('Depression', 'Depression'),
            ('Normal', 'Normal'),
            ('Personality disorder', 'Personality disorder'),
            ('Stress', 'Stress'),
            ('Suicidal', 'Suicidal'),
        ],default='Normal')
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)