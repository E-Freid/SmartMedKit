from flask import request, jsonify
from flask_smorest import Blueprint
import os
import tensorflow as tf
import numpy as np
from PIL import Image
from datetime import datetime

from sqlalchemy.exc import SQLAlchemyError
from db import db
from Models import EventModel

model_path = os.path.join(os.path.dirname(__file__), 'best_model_finetuned_v3_adjusted.keras')
model = tf.keras.models.load_model(model_path)

blp = Blueprint("injury analysis", __name__, description="Operations on injury analysis")


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


@blp.route('/injuries/', methods=['GET'])
def get_events():
    start_time = request.args.get('start_time')
    end_time = request.args.get('end_time')
    limit = request.args.get('limit', default=10, type=int)

    try:
        query = EventModel.query

        if start_time:
            start_time = datetime.fromisoformat(start_time)
            query = query.filter(EventModel.timestamp >= start_time)

        if end_time:
            end_time = datetime.fromisoformat(end_time)
            query = query.filter(EventModel.timestamp <= end_time)

        events = query.order_by(EventModel.timestamp.desc()).limit(limit).all()

        result = [{
            'id': event.id,
            'injury': event.injury,
            'confidence': event.confidence,
            'timestamp': event.timestamp.isoformat()
        } for event in events]

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
