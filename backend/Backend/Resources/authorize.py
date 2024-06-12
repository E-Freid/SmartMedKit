from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from Models import AdminModel

from schemas import AdminSchema, AdminLoginSchema

blp = Blueprint("Authorize", __name__, description="Authorization operations for admins")


@blp.route("/admin/authorize")
class Authorize(MethodView):
    @blp.arguments(AdminLoginSchema)
    @blp.response(200, AdminSchema)
    def post(self, admin_data):
        admin = AdminModel.query.filter_by(email=admin_data["email"]).first()
        if not admin:
            return jsonify({"email": "email not found"}), 404
        if not admin.check_password(admin_data["password"]):
            return jsonify({"password": "password incorrect"}), 401
        return admin
