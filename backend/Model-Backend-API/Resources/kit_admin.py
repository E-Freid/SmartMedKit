from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from Models import KitModel, AdminModel, KitAdminModel

from schemas import KitAdminSchema

blp = Blueprint("kit_admin", __name__, description="Operations on associations between kits and admins")


@blp.route("/kit_admin")
class KitAdminList(MethodView):
    @blp.response(200, KitAdminSchema(many=True), description="List of associations")
    def get(self):
        return KitAdminModel.query.all()

    @blp.arguments(KitAdminSchema)
    @blp.response(201, description="Association created")
    def post(self, kit_admin_data):
        kit_id = kit_admin_data["kit_id"]
        admin_id = kit_admin_data["admin_id"]

        kit = KitModel.query.get_or_404(kit_id)
        admin = AdminModel.query.get_or_404(admin_id)

        if kit not in admin.kits:
            admin.kits.append(kit)
            try:
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                abort(400, message="Association already exists")
            except SQLAlchemyError:
                db.session.rollback()
                abort(500, message="Failed inserting into database")

            return jsonify({"message": "Association created"}), 201
        else:
            abort(400, message="Association already exists")


    @blp.arguments(KitAdminSchema)
    @blp.response(200, description="Association deleted")
    def delete(self, kit_admin_data):
        kit_id = kit_admin_data["kit_id"]
        admin_id = kit_admin_data["admin_id"]

        kit = KitModel.query.get_or_404(kit_id)
        admin = AdminModel.query.get_or_404(admin_id)

        if kit in admin.kits:
            admin.kits.remove(kit)
            try:
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                abort(400, message="Association does not exist")
            except SQLAlchemyError:
                db.session.rollback()
                abort(500, message="Failed deleting from database")

            return jsonify({"message": "Association deleted"}), 200
        else:
            abort(400, message="Association does not exist")