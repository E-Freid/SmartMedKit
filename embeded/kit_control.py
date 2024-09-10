#!/usr/bin/env python3
import RPi.GPIO as GPIO  # import GPIO
from hx711 import HX711  # import the class HX711
import json
import time
import requests
from decimal import Decimal

CALIBRATION_FILE_1 = 'calibration_data_1.json'
CALIBRATION_FILE_2 = 'calibration_data_2.json'

def send_json(scale_id, reading):
    # Round the weight to 2 decimal places
    weight = Decimal(reading).quantize(Decimal('0.00'))
    # Get the current timestamp
    timestamp = int(time.time())

    # Create JSON objects
    json1 = {
        "weight": float(weight),
        "timestamp": timestamp,
        "kit_id": 1,
        "compartment_id": scale_id
    }

    # Convert to JSON format
    json_str = json.dumps(json1)

    # Send POST requests
    url = "https://backend-438353868714.me-west1.run.app/measurements"
    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, data=json_str, headers=headers)

    # Check the responses
    if response.status_code == 201:
        print("JSON was successfully sent.")
    else:
        print("Failed to send JSON.")



def print_scale_info(kit_id, compartment_id, weight):
    # Round the weight to 2 decimal places
    weight = Decimal(weight).quantize(Decimal('0.00'))
    # Get the current timestamp
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
    print(f"Kit ID: {kit_id}, Compartment ID: {compartment_id}, Weight: {weight}g, Timestamp: {timestamp}")


def save_calibration_data(ratio, file):
    with open(file, 'w') as f:
        json.dump({'ratio': ratio}, f)

def load_calibration_data(file):
    try:
        with open(file, 'r') as f:
            data = json.load(f)
            return data['ratio']
    except (FileNotFoundError, json.JSONDecodeError, KeyError):
        return None

def setup_scale(dout_pin, pd_sck_pin, calibration_file):
    hx = HX711(dout_pin=dout_pin, pd_sck_pin=pd_sck_pin)
    err = hx.zero()
    if err:
        raise ValueError('Tare is unsuccessful.')

    ratio = load_calibration_data(calibration_file)
    if ratio is None:
        reading = hx.get_raw_data_mean()
        if reading:
            print('Data subtracted by offset but still not converted to units:', reading)
        else:
            print('invalid data', reading)

        input('Put known weight on the scale and then press Enter')
        reading = hx.get_data_mean()
        if reading:
            print('Mean value from HX711 subtracted by offset:', reading)
            known_weight_grams = input('Write how many grams it was and press Enter: ')
            try:
                value = float(known_weight_grams)
                print(value, 'grams')
            except ValueError:
                print('Expected integer or float and I have got:', known_weight_grams)

            ratio = reading / value
            save_calibration_data(ratio, calibration_file)
            print('Ratio is set.')
        else:
            raise ValueError('Cannot calculate mean value. Try debug mode. Variable reading:', reading)
    else:
        print('Loaded ratio from file.')

    hx.set_scale_ratio(ratio)
    return hx

try:
    GPIO.setmode(GPIO.BCM)  # set GPIO pin mode to BCM numbering
    hx1 = setup_scale(22, 23, CALIBRATION_FILE_1)
    hx2 = setup_scale(17, 21, CALIBRATION_FILE_2)

    print("Now, I will read data in infinite loop. To exit press 'CTRL + C'")
    input('Press Enter to begin reading')
    print('Current weight on the scales in grams is: ')
    while True:
        # # print('Scale 1:', hx1.get_weight_mean(20), 'g')
        # # print('Scale 2:', hx2.get_weight_mean(20), 'g')

        # # For scale 1
        # weight1 = hx1.get_weight_mean(20)
        # print_scale_info(1, 1, weight1)

        # # For scale 2
        # # Assuming you have another HX711 instance for the second scale
        # weight2 = hx2.get_weight_mean(20)
        # print_scale_info(1, 2, weight2)

        # time.sleep(30)

        weight = hx1.get_weight_mean(20)
        print(weight, 'g')
        send_json(1, weight)
        weight = hx2.get_weight_mean(20)
        print(weight, 'g')
        send_json(2, weight)

        time.sleep(2)

except (KeyboardInterrupt, SystemExit):
    print('Bye :)')

finally:
    GPIO.cleanup()