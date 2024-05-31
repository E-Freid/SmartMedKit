from db import db

class KitCompartmentModel(db.Model):
    __tablename__ = "kit_Compartments"

    kit_id = db.Column(db.Integer, db.ForeignKey("kits.id"), primary_key=True)
    compartment_id = db.Column(db.Integer, primary_key=True)

    kit = db.relationship("KitModel", back_populates="compartments")
    measurements = db.relationship("MeasurementModel", back_populates="compartment")
