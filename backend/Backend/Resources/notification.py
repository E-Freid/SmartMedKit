from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from Models import NotificationModel

from schemas import NotificationSchema

blp = Blueprint("notifications", __name__,  description="Operations on notifications")


@blp.route("/notification")
class NotificationList(MethodView):
    @blp.response(200, NotificationSchema(many=True))
    def get(self):
        return NotificationModel.query.all()