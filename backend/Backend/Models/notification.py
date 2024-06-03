from db import db
import datetime


class NotificationModel(db.Model):

    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    admins = db.relationship("AdminModel", secondary="admin_notifications", back_populates="notifications")
    kits = db.relationship("KitModel", secondary="notification_kits", back_populates="notifications")