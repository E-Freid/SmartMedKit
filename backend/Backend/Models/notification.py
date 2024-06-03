from db import db
import datetime


class NotificationModel(db.Model):

    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    admin = db.relationship("AdminModel", back_populates="notifications", secondary="admin_notifications")
    kit = db.relationship("KitModel", back_populates="notifications", secondary="notification_kits")