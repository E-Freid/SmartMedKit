from db import db

class KitModel(db.Model):
    __tablename__ = "kits"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    location = db.Column(db.String(80), nullable=False)

    admins = db.relationship("AdminModel", back_populates="kits", secondary="kit_admin")