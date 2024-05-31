import subprocess


def start_celery():
    worker = subprocess.Popen(['celery', '-A', 'app', 'worker', '--loglevel=info'])
    beat = subprocess.Popen(['celery', '-A', 'app', 'beat', '--loglevel=info'])
    return worker, beat


def cleanup(worker, beat):
    worker.terminate()
    beat.terminate()
    worker.wait()
    beat.wait()
