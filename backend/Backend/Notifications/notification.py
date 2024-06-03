import os
from dotenv import load_dotenv

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

load_dotenv()

VERIFIED_EMAIL = "SmartMedKitAlerter@gmail.com"
PASSWORD = os.getenv("PASSWORD", None)
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", None)

def send_email(to, subject, content):
    if PASSWORD is None or SENDGRID_API_KEY is None:
        print("No email credentials found")
        return
    message = Mail(
        from_email=VERIFIED_EMAIL,
        to_emails=to,
        subject=subject,
        html_content=content
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
    except Exception as e:
        print(e.message)