import os.path
from db import db

from flask import Flask, request, jsonify
from PIL import Image
import io
import numpy as np
import tensorflow as tf
from flask_migrate import Migrate

model_path = os.path.join(os.path.dirname(__file__), '..', 'Model', 'best_model_finetuned_v3_adjusted.keras')
model = tf.keras.models.load_model(model_path)

def get_image_from_request_file(file):
    image = Image.open(file.stream)
    image = image.convert('RGB')
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)

    return image


def create_app(db_url=None):
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv("DATABASE_URL", "sqlite:///data.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate = Migrate(app, db, compare_type=False)

    @app.route('/injuries/analyze', methods=['POST'])
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

            result = {
                "class": predicted_class,
                "confidence": float(confidence)
            }

            return jsonify(result)

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)