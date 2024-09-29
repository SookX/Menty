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
    
    date = models.DateTimeField(auto_now_add=True)
    anxiety_score = models.FloatField()
    bipolar_score = models.FloatField()
    depression_score = models.FloatField()
    normal_score = models.FloatField()
    personality_disorder_score = models.FloatField()
    stress_score = models.FloatField()
    suicidal_score = models.FloatField()
    help_text = models.TextField()

    def __str__(self):
        return f"MentalHealth(anxiety_score={self.anxiety_score}, bipolar_score={self.bipolar_score}, depression_score={self.depression_score}, normal_score={self.normal_score}, personality_disorder_score={self.personality_disorder_score}, stress_score={self.stress_score}, suicidal_score={self.suicidal_score})"


