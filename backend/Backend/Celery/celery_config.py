from celery import Celery
from celery.schedules import crontab

def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)

    celery.conf.beat_schedule = {
        'notify-admins-every-5-minutes': {
            'task': 'Celery.tasks.notify_admins',
            'schedule': crontab(minute='*/1'),
        },
    }

    return celery
