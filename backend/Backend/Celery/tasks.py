from datetime import datetime, timedelta
from app import celery

from Models import AdminModel, KitModel, MeasurementsModel
from db import db

from Celery.measurements_utils import notify_if_below_moving_average, notify_if_below_threshold, notify_if_downward_trend


THRESHOLD_RATIO = 0.75
WINDOW_SIZE = 5
LOOKBACK_MINUTES = 60

@celery.task
def notify_admins():
    print("Running notify_admins task")
    # curr_time = datetime.utcnow()
    # lookback_time = curr_time - timedelta(minutes=LOOKBACK_MINUTES)
    #
    # measurements = MeasurementsModel.query.filter(MeasurementsModel.timestamp >= lookback_time).all()
    #
    # kits_to_notify = {}
    #
    # for measurements in measurements:
    #     kit = measurements.kit
    #     compartment_number = measurements.compartment.compartment_number
    #     recent_measurements = MeasurementsModel.query.filter_by(
    #         kit_id=kit.id,
    #         compartment_id=measurements.compartment_id
    #     ).order_by(MeasurementsModel.timestamp.desc()).limit(WINDOW_SIZE).all()
    #
    #     if recent_measurements:
    #         latest_measurement = recent_measurements[0]
    #
    #         if notify_if_below_threshold(measurements.weight, latest_measurement.weight * THRESHOLD_RATIO) or \
    #                 notify_if_below_moving_average(recent_measurements, measurements.weight, THRESHOLD_RATIO, WINDOW_SIZE) or \
    #                 notify_if_downward_trend(recent_measurements):
    #
    #             if kit.id not in kits_to_notify:
    #                 kits_to_notify[kit.id] = set()
    #             kits_to_notify[kit.id].add(compartment_number)
    #
    # for kit_id, compartments in kits_to_notify.items():
    #     kit = KitModel.query.get(kit_id)
    #     admins = AdminModel.query.filter_by(kit_id=kit_id).all()
    #     for admin in admins:
    #         # implemnt notification here
    #         print(f"Sending notification to {admin.email} for kit {kit.name} compartments {compartments}")
    #