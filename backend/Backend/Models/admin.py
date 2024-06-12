from db import db
from werkzeug.security import generate_password_hash, check_password_hash

class AdminModel(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    kits = db.relationship("KitModel", back_populates="admins", secondary="kit_admin")
    notifications = db.relationship("NotificationModel", back_populates="admins", secondary="admin_notifications")

    def set_password(self, password):
        self.password = generate_password_hash(password, method="pbkdf2:sha256")

    def check_password(self, password):
        return check_password_hash(self.password, password)