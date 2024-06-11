from db import db


class NotificationAdminModel(db.Model):

    __tablename__ = "admin_notifications"

    admin_id = db.Column(db.Integer, db.ForeignKey("admins.id"), primary_key=True)
    notification_id = db.Column(db.Integer, db.ForeignKey("notifications.id"), primary_key=True)