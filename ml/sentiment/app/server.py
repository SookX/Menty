import tensorflow as tf
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

def stack_samples(text_data, text_vectorizer):

    """
    Process and vectorize text data using the provided TextVectorization layer.

    Parameters:
    - text_data: A 1D NumPy array or list of text strings, where each element is a text string to be vectorized.
    - text_vectorizer: A trained TextVectorization layer used to convert text into numerical vectors.

    Returns:
    - A NumPy array of shape (output_seq_len, len(text_data)), where output_seq_len is the length of the vectorized output sequence.
    """

    text_data_array = np.array(text_data)
    text_data_expanded = np.expand_dims(text_data_array, axis=1)
    
    vectorized_data = text_vectorizer(text_data_expanded)
    vectorized_data_array = np.array(vectorized_data)
    return vectorized_data_array
    

classes = []
with open('app/classes.txt', 'r') as f:
    for line in f:
        classes.append(line.strip())  

model = tf.keras.models.load_model('app/good.h5')
loaded_model = tf.keras.models.load_model('app/vectorizer')
vectorizer = loaded_model.layers[0]

app = FastAPI()

class TextData(BaseModel):
    text: str

@app.get('/')
def read_root():

    """
    Root endpoint that provides a simple message about the API.

    Returns:
    - A JSON object containing a message about the API's purpose.

    """

    return {'message': 'Mental Health Sentiment Analysis'}

@app.post('/predict')
def predict(data: TextData):

    """
    Endpoint for predicting the sentiment class of the input text.

    Parameters:
    - data: A `TextData` object that contains the input text in the form of a string.

    Workflow:
    1. The input text is passed to the `stack_samples` function for vectorization.
    2. The vectorized text is then fed to the trained machine learning model for prediction.
    3. The predicted class label is determined by selecting the class with the highest probability.
    4. The prediction probabilities are converted to a list format for JSON serialization.

    Returns:
    - A JSON object containing:
        - 'Predicted Class': The sentiment class predicted by the model.
        - 'Prediction Array': The array of probabilities or confidence scores for each class, returned as a list.

    """

    vectorized_input = stack_samples([data.text], vectorizer)
    prediction = model.predict(vectorized_input)
    class_prediction = classes[np.argmax(prediction)]
    
    prediction_list = prediction.tolist()

    return {
        'Predicted Class': class_prediction, 
        'Prediction Array': prediction_list
    }
