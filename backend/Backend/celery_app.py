from app import create_app
from Celery.celery_config import make_celery
from Models import MeasurementsModel, KitModel, NotificationModel
from db import db
from Celery.measurements_utils import notify_if_below_threshold, notify_if_below_moving_average, notify_if_downward_trend
import logging
import datetime
from Notifications.notification import send_email

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Flask and Celery setup
flask_app = create_app()
celery = make_celery(flask_app)

# Configuration constants
THRESHOLD_RATIO = 0.25
WINDOW_SIZE = 5


def is_kit_empty(kit_id):
    recent_measurements = MeasurementsModel.query.filter_by(kit_id=kit_id).order_by(
        MeasurementsModel.timestamp.desc()).limit(WINDOW_SIZE).all()

    if recent_measurements:
        latest_measurement = recent_measurements[0]
        maximum_weight = max(m.weight for m in recent_measurements)

        if notify_if_below_threshold(latest_measurement.weight, maximum_weight * THRESHOLD_RATIO) or \
                notify_if_below_moving_average(recent_measurements, latest_measurement.weight, THRESHOLD_RATIO,
                                               WINDOW_SIZE) or \
                notify_if_below_moving_average(recent_measurements, latest_measurement.weight, THRESHOLD_RATIO,
                                               WINDOW_SIZE):
            return True

    return False


@celery.task(name='notify_admins')
def notify_admins():
    with flask_app.app_context():
        try:
            kits = KitModel.query.all()
            kits_to_notify = set()

            for kit in kits:
                if is_kit_empty(kit.id):
                    kits_to_notify.add(kit.id)

            admins = []

            for kit_id in kits_to_notify:
                kit = KitModel.query.get(kit_id)

                admins = kit.admins
                admins = [admin for admin in admins if not any(notification.timestamp > datetime.datetime.utcnow() - datetime.timedelta(minutes=30) for notification in admin.notifications)]

                notification = NotificationModel(timestamp=datetime.datetime.utcnow())
                notification.kits.append(kit)

                for admin in admins:
                    notification.admins.append(admin)
                    logger.info(f"Sending notification to {admin.email} for kit {kit.name}")
                    send_email(admin.email, f"Notification for kit {kit.name}", f"Kit {kit.name} with id {kit_id} requires attention")

                try:
                    db.session.add(notification)
                    db.session.commit()
                except Exception as e:
                    logger.error(f"Error in notify_admins task: {e}")

            return f"Notified {len(admins)} admins for {len(kits_to_notify)} kits"

        except Exception as e:
            logger.error(f"Error in notify_admins task: {e}")
            return "Failed"