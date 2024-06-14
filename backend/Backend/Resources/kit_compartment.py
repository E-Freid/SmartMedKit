from flask_smorest import Blueprint, abort
from flask.views import MethodView
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from schemas import KitCompartmentSchema, KitCompartmentWeightUpdateSchema
from datetime import datetime

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

        new_kit_compartment = KitCompartmentModel(**new_data)
        db.session.add(new_kit_compartment)

        try:
            db.session.commit()
        except IntegrityError:
            abort(400, message="Kit compartment already exists")
        except SQLAlchemyError:
            abort(500, message="An error occurred while creating the kit compartment")

        return new_kit_compartment


@blp.route("/kit_compartments/<int:kit_id>/<int:compartment_id>")
class KitCompartmentDetail(MethodView):
    @blp.response(200, KitCompartmentSchema)
    def get(self, kit_id, compartment_id):
        """Get a kit compartment"""
        kit_compartment = KitCompartmentModel.query.get((kit_id, compartment_id))
        if not kit_compartment:
            abort(404, message="Kit compartment not found")
        return kit_compartment

    def delete(self, kit_id, compartment_id):
        """Delete a kit compartment"""
        kit_compartment = KitCompartmentModel.query.get((kit_id, compartment_id))
        if not kit_compartment:
            abort(404, message="Kit compartment not found")
        db.session.delete(kit_compartment)
        db.session.commit()
        return {"message": "Kit compartment deleted"}, 200


    @blp.arguments(KitCompartmentWeightUpdateSchema)
    @blp.response(200, KitCompartmentSchema)
    def patch(self, update_data, kit_id, compartment_id):
        """Update the weight of a kit compartment"""
        kit_compartment = KitCompartmentModel.query.get((kit_id, compartment_id))
        if not kit_compartment:
            abort(404, message="Kit compartment not found")

        kit_compartment.max_weight = update_data["weight"]
        # also update a new measurement in the db
        try:
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while updating the kit compartment")
        return kit_compartment