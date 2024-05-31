from flask_smorest import Blueprint, abort
from flask.views import MethodView
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from schemas import KitCompartmentSchema

from db import db
from Models import KitCompartmentModel, KitModel

blp = Blueprint("kit_compartments", __name__, description="Operations on kit compartments")


@blp.route("/kit_compartments")
class KitCompartment(MethodView):
    @blp.response(200, KitCompartmentSchema(many=True))
    def get(self):
        """Get all kit compartments"""
        return KitCompartmentModel.query.all()

    @blp.arguments(KitCompartmentSchema)
    @blp.response(201, KitCompartmentSchema)
    def post(self, new_data):
        """Create a new kit compartment"""
        kit_id = new_data["kit_id"]
        compartment_id = new_data["compartment_id"]

        kit = KitModel.query.get(kit_id)
        if not kit:
            abort(404, message="Kit not found")

        new_kit_compartment = KitCompartmentModel(kit_id=kit_id, compartment_id=compartment_id)
        db.session.add(new_kit_compartment)

        try:
            db.session.commit()
        except IntegrityError:
            abort(400, message="Kit compartment already exists")
        except SQLAlchemyError:
            abort(500, message="An error occurred while creating the kit compartment")

        return new_kit_compartment