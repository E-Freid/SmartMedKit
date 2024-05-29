from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from Models import KitModel

from schemas import KitSchema, KitUpdateSchema

blp = Blueprint("kits", __name__)


@blp.route("/kit")
class KitList(MethodView):
    @blp.response(200, KitSchema(many=True))
    def get(self):
        return KitModel.query.all()

    @blp.arguments(KitSchema)
    @blp.response(201, KitSchema)
    def post(self, kit_data):
        kit = KitModel(**kit_data)
        try:
            db.session.add(kit)
            db.session.commit()
        except IntegrityError:
            abort(400, message="Kit already exists")
        except SQLAlchemyError:
            abort(500, message="Failed inserting into database")

        return kit


@blp.route("/kit/<int:kit_id>")
class Kit(MethodView):
    @blp.response(200, KitSchema)
    def get(self, kit_id):
        kit = KitModel.query.get_or_404(kit_id)
        return kit

    def delete(self, kit_id):
        kit = KitModel.query.get_or_404(kit_id)
        db.session.delete(kit)
        db.session.commit()
        return jsonify({"message": "Kit deleted"}), 200

    @blp.arguments(KitUpdateSchema)
    @blp.response(200, KitSchema)
    def put(self, kit_data, kit_id):
        kit = KitModel.query.get_or_404(kit_id)
        for key, value in kit_data.items():
            setattr(kit, key, value)

        try:
            db.session.commit()
        except IntegrityError:
            abort(400, message="Kit already exists")
        except SQLAlchemyError:
            abort(500, message="Failed updating database")

        return kit
