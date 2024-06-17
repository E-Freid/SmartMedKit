from db import db
from time import time


class NotificationModel(db.Model):

    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.Integer, default=int(time()), nullable=False)

    admins = db.relationship("AdminModel", secondary="admin_notifications", back_populates="notifications")
    kits = db.relationship("KitModel", secondary="notification_kits", back_populates="notifications")