from tensorflow.keras.applications import VGG16
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt

# Enhanced augmentation parameters
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=45,  # slightly increased rotation
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.25,  # slightly increased shear
    zoom_range=0.25,  # slightly increased zoom
    channel_shift_range=20.0,  # adding channel shift for color variation
    horizontal_flip=True,
    vertical_flip=True,  # adding vertical flip
    fill_mode='nearest'
)

validation_datagen = ImageDataGenerator(rescale=1./255)

# Load the VGG16 network, ensuring the final fully connected layers are left off
base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Modify the number of trainable layers in the base model
for layer in base_model.layers[:-10]:
    layer.trainable = False
for layer in base_model.layers[-10:]:
    layer.trainable = True

# Create the new model on top
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(512, activation='relu')(x)
x = Dropout(0.6)(x)  # Increased dropout
predictions = Dense(1, activation='sigmoid')(x)
model = Model(inputs=base_model.input, outputs=predictions)

# Lowering the learning rate further for fine-tuning
model.compile(optimizer=Adam(learning_rate=0.00001), loss='binary_crossentropy', metrics=['accuracy'])

# Data generators with adjusted batch size
train_generator = train_datagen.flow_from_directory(
    'DataSet/train',
    target_size=(224, 224),
    batch_size=16,  # Adjusted batch size
    class_mode='binary'
)

validation_generator = validation_datagen.flow_from_directory(
    'DataSet/validation',
    target_size=(224, 224),
    batch_size=16,  # Adjusted batch size
    class_mode='binary'
)

# Callbacks for early stopping and model checkpointing
early_stopping = EarlyStopping(monitor='val_loss', patience=5, verbose=1, mode='min')
model_checkpoint = ModelCheckpoint('best_model_finetuned_v3_adjusted.keras', monitor='val_loss', save_best_only=True, mode='min', verbose=1)

# Model training with the adjusted configuration
history = model.fit(
    train_generator,
    epochs=20,
    validation_data=validation_generator,
    callbacks=[early_stopping, model_checkpoint]
)

# Plotting the accuracy
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['Train', 'Validation'], loc='upper left')
plt.show()

# Plotting the loss
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Train', 'Validation'], loc='upper left')
plt.show()
