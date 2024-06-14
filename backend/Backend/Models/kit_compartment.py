from db import db

class KitCompartmentModel(db.Model):
    __tablename__ = "kit_Compartments"

    kit_id = db.Column(db.Integer, db.ForeignKey("kits.id"), primary_key=True)
    compartment_id = db.Column(db.Integer, primary_key=True)
    max_weight = db.Column(db.Float(precision=2), nullable=False)

    kit = db.relationship("KitModel", back_populates="compartments")
    measurements = db.relationship("MeasurementsModel", back_populates="compartment")
