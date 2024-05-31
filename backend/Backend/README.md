# Backend Project

This project is a backend service that uses Flask for the web server, Celery for task queueing, and Redis for message brokering. The project is containerized using Docker and Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```
git clone https://github.com/yourusername/SmartMedKit.git
cd SmartMedKit/Backend
```

### 2. download and place the model to /Backend/Resouce folder (where injury.py located)
https://www.dropbox.com/scl/fi/30rkhudwxwiuep1gtc6f1/best_model_finetuned_v3_adjusted.keras?rlkey=mtomnkp9ir4qaytj3pi2nbdsj&st=3onl0mrz&dl=0

### 3. Build the Docker Image
```
docker-compose build
```

### 4. Start the Service
```
Start the Services
```

### 5. Accesing the web REST API

the docker image exposes port 5050, so use it in the API calls.

check swagger-ui for the API's endpoints and schemas
```
http://localhost:5050/swagger-ui
```

### 6. Check Logs

To check the logs for the application, use the following command:
```
docker-compose logs -f app
```

### 7. Enter the Container Shell

If you need to enter the shell of the running container, use the following command:
```
docker exec -it backend_app_1 /bin/bash
```

### 8. Verify Supervisor Setup

Once inside the container, you can verify the processes managed by Supervisor and check the log files:
```
# Check running processes managed by Supervisor
supervisorctl status

# Navigate to the log directory and view logs
cd /var/log
cat flask.out.log
cat celery-worker.out.log
cat celery-beat.out.log
```

each process also has .err.log logs

## Technical Details
### Ports:
```
Flask app: 5000
Redis: 6379
```
### Environment Variables:
```
FLASK_APP: app.py
FLASK_ENV: development
CELERY_BROKER_URL: redis://redis:6379/0
CELERY_RESULT_BACKEND: redis://redis:6379/0
```

## Stoping the Services

To stop the running services, press Ctrl+C or use the following command:
```
docker-compose down
```
