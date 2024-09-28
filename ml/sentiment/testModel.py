import tensorflow as tf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from utils import stack_samples

if(len(tf.config.list_physical_devices('GPU')) > 0):
    print("Using: Cuda\n")
else:
    print("Using: CPU\n")

X_test = np.loadtxt('./data/X_test.txt')
y_test = np.loadtxt('./data/y_test.txt')
classes = []
with open('./data/classes.txt', 'r') as f:
    for line in f:
        classes.append(line.split('\n')[0])
print(classes)

print("Loading model: \n")

model = tf.keras.models.load_model('./checkpoints/good.h5')

loss, accuracy = model.evaluate(X_test, y_test)

filepath = "./data/vectorizer"
loaded_model = tf.keras.models.load_model(filepath)
vectorizer = loaded_model.layers[0]

text = ["I dont to live anymore. This is not for me."]
prediction = model.predict(stack_samples(text, vectorizer))
print(classes[np.argmax(prediction)])




print(accuracy)