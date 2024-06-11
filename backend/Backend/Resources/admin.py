from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from Models import KitModel, AdminModel

from schemas import AdminSchema, AdminUpdateSchema

blp = Blueprint("admins", __name__, description="Operations on admins")


@blp.route("/admin")
class AdminList(MethodView):
    @blp.response(200, AdminSchema(many=True))
    def get(self):
        return AdminModel.query.all()

    @blp.arguments(AdminSchema)
    @blp.response(201, AdminSchema)
    def post(self, admin_data):
        admin = AdminModel(**admin_data)
        try:
            db.session.add(admin)
            db.session.commit()
        except IntegrityError:
            abort(400, message="Admin already exists")
        except SQLAlchemyError:
            abort(500, message="Failed inserting into database")

        return admin


@blp.route("/admin/<int:admin_id>")
class Admin(MethodView):
    @blp.response(200, AdminSchema)
    def get(self, admin_id):
        admin = AdminModel.query.get_or_404(admin_id)
        return admin

    def delete(self, admin_id):
        admin = AdminModel.query.get_or_404(admin_id)
        db.session.delete(admin)
        db.session.commit()
        return jsonify({"message": "Admin deleted"}), 200

    @blp.arguments(AdminUpdateSchema)
    @blp.response(200, AdminSchema)
    def put(self, admin_data, admin_id):
        admin = AdminModel.query.get_or_404(admin_id)
        for key, value in admin_data.items():
            setattr(admin, key, value)

        try:
            db.session.commit()
        except IntegrityError:
            abort(400, message="Admin already exists")
        except SQLAlchemyError:
            abort(500, message="Failed updating database")

        return admin
