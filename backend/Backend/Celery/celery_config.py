from celery import Celery
from celery.schedules import crontab


def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['result_backend'],
        broker=app.config['broker_url']
    )
    celery.conf.update(app.config)

    celery.conf.beat_schedule = {
        'notify-admins-every-5-minutes': {
            'task': 'notify_admins',
            'schedule': crontab(minute='*/1'),
        },
    }
    celery.conf.timezone = 'UTC'

    return celery
