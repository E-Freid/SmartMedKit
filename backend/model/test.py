from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np

# Load the best model
model = load_model('best_model_finetuned_v3_adjusted.keras')

def evaluate_model():
    # Prepare the test data generator
    test_datagen = ImageDataGenerator(rescale=1./255)
    test_generator = test_datagen.flow_from_directory(
        'DataSet/test',
        target_size=(224, 224),
        batch_size=32,
        class_mode='binary',
        shuffle=False  # It's important not to shuffle test data
    )

    # Evaluate the model on the test set
    test_loss, test_accuracy = model.evaluate(test_generator)
    print('Test loss:', test_loss)
    print('Test accuracy:', test_accuracy)

def predict_img(path):
    img = load_img(path, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)

    print(f"Predictions for {path}: ", predictions)
    if predictions[0] > 0.5:
        print('Predicted: Cut')
    else:
        print('Predicted: Burn')


def main():
    evaluate_model()

if __name__ == '__main__':
    main()