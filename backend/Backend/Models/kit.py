from db import db

class KitModel(db.Model):
    __tablename__ = "kits"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    location = db.Column(db.String(80), nullable=False)

    admins = db.relationship("AdminModel", back_populates="kits", secondary="kit_admin")
    compartments = db.relationship("KitCompartmentModel", back_populates="kit")
    measurements = db.relationship("MeasurementsModel", back_populates="kit")
    notifications = db.relationship("NotificationModel", back_populates="kits", secondary="notification_kits")