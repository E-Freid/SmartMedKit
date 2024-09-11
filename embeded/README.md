# SmartMedKit Embedded System

## Overview
This project is part of the SmartMedKit system, an innovative IoT-enabled first-aid kit equipped with real-time tracking and AI-based analysis features. The embedded system is responsible for managing the weight sensors and sending the data to the backend for further processing.

## Features
- **Weight Measurement:** Uses HX711 weight sensors to measure the weight of items in the first-aid kit.
- **Data Transmission:** Sends weight data to the backend server for inventory management.
- **Calibration:** Supports calibration of the weight sensors to ensure accurate measurements.

## Hardware Requirements
- Raspberry Pi
- HX711 weight sensors
- GPIO pins for connecting the sensors

## Software Requirements
- Python 3
- RPi.GPIO
- hx711
- requests
- json

## Installation
1. **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install the required Python packages:**
    ```sh
    pip install RPi.GPIO hx711 requests
    ```

## Usage
1. **Connect the HX711 sensors to the Raspberry Pi GPIO pins as specified in the code.**

2. **Run the script:**
    ```sh
    python3 embeded/kit_control.py
    ```

3. **Follow the on-screen instructions to calibrate the sensors if needed.**

## Configuration
- **Calibration Files:** The calibration data is stored in `calibration_data_1.json` and `calibration_data_2.json`.
- **Backend URL:** The data is sent to the backend server at `https://backend-438353868714.me-west1.run.app/measurements`.

## Code Structure
- **`embeded/kit_control.py`:** Main script for managing the weight sensors and sending data to the backend.

## Troubleshooting
- **Sensor Calibration:** If the sensors are not providing accurate readings, recalibrate them by following the on-screen instructions.
- **Data Transmission:** Ensure that the Raspberry Pi has a stable internet connection to send data to the backend.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact
For any questions or issues, please contact the project maintainers.