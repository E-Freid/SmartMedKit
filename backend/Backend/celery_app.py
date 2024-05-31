from app import create_app
from Celery.celery_config import make_celery
from Models import MeasurementsModel, KitModel
from Celery.measurements_utils import notify_if_below_threshold, notify_if_below_moving_average, notify_if_downward_trend
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Flask and Celery setup
flask_app = create_app()
celery = make_celery(flask_app)

# Configuration constants
THRESHOLD_RATIO = 0.25
WINDOW_SIZE = 5

@celery.task(name='notify_admins')
def notify_admins():
    with flask_app.app_context():
        try:
            kits = KitModel.query.all()
            kits_to_notify = set()

            for kit in kits:
                recent_measurements = MeasurementsModel.query.filter_by(kit_id=kit.id).order_by(
                    MeasurementsModel.timestamp.desc()).limit(WINDOW_SIZE).all()

                if recent_measurements:
                    latest_measurement = recent_measurements[0]
                    maximum_weight = max(m.weight for m in recent_measurements)

                    # Check if the threshold is crossed
                    if notify_if_below_threshold(latest_measurement.weight, maximum_weight * THRESHOLD_RATIO):
                        kits_to_notify.add(kit.id)

                    # Check if the moving average is below the threshold
                    if notify_if_below_moving_average(recent_measurements, latest_measurement.weight, THRESHOLD_RATIO, WINDOW_SIZE):
                        kits_to_notify.add(kit.id)

                    # Check if there is a downward trend
                    if notify_if_downward_trend(recent_measurements):
                        kits_to_notify.add(kit.id)

            for kit_id in kits_to_notify:
                kit = KitModel.query.get(kit_id)
                admins = kit.admins
                for admin in admins:
                    # Implement notification logic here
                    logger.info(f"Sending notification to {admin.phone_num} for kit {kit.name}")
                    # send_notification(admin.phone_num, kit.name)  # Replace with actual notification function

            return f"Notified admins for {len(kits_to_notify)} kits"

        except Exception as e:
            logger.error(f"Error in notify_admins task: {e}")
            return "Failed"