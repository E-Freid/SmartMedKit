from db import db
from time import time


class MeasurementsModel(db.Model):
    __tablename__ = "measurements"

    id = db.Column(db.Integer, primary_key=True)
    kit_id = db.Column(db.Integer, db.ForeignKey("kits.id"), nullable=False)
    compartment_id = db.Column(db.Integer, db.ForeignKey("kit_Compartments.compartment_id"), nullable=False)
    weight = db.Column(db.Float(precision=2), nullable=False)
    timestamp = db.Column(db.Integer, default=int(time()), nullable=False)

    compartment = db.relationship("KitCompartmentModel", back_populates="measurements")
    kit = db.relationship("KitModel", back_populates="measurements")
