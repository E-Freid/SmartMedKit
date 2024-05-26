import logging

from flask import Blueprint, request, jsonify, abort
import os
import tensorflow as tf
import numpy as np
from PIL import Image

from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from db import db
from Models import EventModel

model_path = os.path.join(os.path.dirname(__file__), '../..', 'Model', 'best_model_finetuned_v3_adjusted.keras')
model = tf.keras.models.load_model(model_path)

blp = Blueprint("injury analysis", __name__)


def get_image_from_request_file(file):
    image = Image.open(file.stream)
    image = image.convert('RGB')
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)

    return image


@blp.route('/injuries/analyze', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        image = get_image_from_request_file(file)

        print("Image shape:", image.shape)

        prediction = model.predict(image)

        predicted_class = "Cut" if prediction[0][0] > 0.5 else "Burn"
        confidence = prediction[0][0] if prediction[0][0] > 0.5 else 1 - prediction[0][0]

        event = EventModel(injury=predicted_class, confidence=confidence)
        try:
            db.session.add(event)
            db.session.commit()
            print("Added entry to database")
        except SQLAlchemyError:
            print("Failed inserting into database")

        result = {
            "class": predicted_class,
            "confidence": float(confidence)
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
