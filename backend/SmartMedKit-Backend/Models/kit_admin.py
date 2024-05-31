from db import db

class KitAdminModel(db.Model):
    __tablename__ = "kit_admin"

    kit_id = db.Column(db.Integer, db.ForeignKey("kits.id"), primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey("admins.id"), primary_key=True)