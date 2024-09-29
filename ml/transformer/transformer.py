import os
from groq import Groq  
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('GROQ_API_KEY')
GROQ_KEY = os.environ.get('GROQ_API_KEY', api_key)

client = Groq(
    api_key=GROQ_KEY
)

classes = []
with open('./classes.txt', 'r') as f:
    for line in f:
        classes.append(line.strip())  

prediction = {
    "Predicted Class": "Depression",
    "Prediction Array": [
        [
            0.04638216644525528,
            0.6597574949264526,
            0.0679619163274765,
            0.008775031194090843,
            0.12950173020362854,
            0.08484483510255814,
            0.0027768376749008894
        ]
    ]
}

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

print(chat_completion.choices[0].message.content)
