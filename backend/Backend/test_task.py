from celery_app import notify_admins

result = notify_admins.delay()

print(result.get(timeout=5))