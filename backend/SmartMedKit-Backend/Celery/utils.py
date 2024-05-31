import subprocess


def start_celery():
    worker = subprocess.Popen(['celery', '-A', 'SmartMedKit-Backend.Celery.celery_config', 'worker', '--loglevel=info'])
    beat = subprocess.Popen(['celery', '-A', 'SmartMedKit-Backend.Celery.celery_config', 'beat', '--loglevel=info'])
    return worker, beat


def cleanup(worker, beat):
    worker.terminate()
    beat.terminate()
    worker.wait()
    beat.wait()
