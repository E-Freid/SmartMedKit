from db import db
from datetime import datetime


class MeasurementsModel(db.Model):
    __tablename__ = "measurements"

    id = db.Column(db.Integer, primary_key=True)
    kit_id = db.Column(db.Integer, db.ForeignKey("kits.id"), nullable=False)
    compartment_id = db.Column(db.Integer, foreign_keys="kit_compartments.compartment_id", nullable=False)
    weight = db.Column(db.Float(precision=2), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    compartment = db.relationship("KitCompartmentModel", back_populates="measurements")