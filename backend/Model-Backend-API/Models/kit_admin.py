from db import db

class KitAdminModel(db.Model):
    __tablename__ = "kit_admin"

    id = db.Column(db.Integer, primary_key=True)
    kit_id = db.Column(db.Integer, db.ForeignKey("kit.id"))
    admin_id = db.Column(db.Integer, db.ForeignKey("admin.id"))