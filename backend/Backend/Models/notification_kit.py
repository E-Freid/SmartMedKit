from db import db


class NotificationKitModel(db.Model):

    __tablename__ = "notification_kits"

    notification_id = db.Column(db.Integer, db.ForeignKey("notifications.id"), primary_key=True)
    kit_id = db.Column(db.Integer, db.ForeignKey("kits.id"), primary_key=True)