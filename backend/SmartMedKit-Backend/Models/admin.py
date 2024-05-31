from db import db

class AdminModel(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    phone_num = db.Column(db.String(20), unique=True, nullable=False)

    kits = db.relationship("KitModel", back_populates="admins", secondary="kit_admin")