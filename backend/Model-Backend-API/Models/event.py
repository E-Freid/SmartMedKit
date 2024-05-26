from db import db

class EventModel(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    injury = db.Column(db.String(20), nullable=False)
    confidence = db.Column(db.Float(precision=2), nullable=False)
    