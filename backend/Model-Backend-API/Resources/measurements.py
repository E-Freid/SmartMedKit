from flask_smorest import Blueprint, abort
from flask.views import MethodView
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from schemas import MeasurementSchema

from db import db
from Models import KitModel, MeasurementsModel, KitCompartmentModel

blp = Blueprint("measurements", __name__, description="Operations on measurements")


@blp.route("/measurements")
class Measurements(MethodView):
    @blp.response(200, MeasurementSchema(many=True))
    def get(self):
        measurements = MeasurementsModel.query.all()
        return measurements

    @blp.arguments(MeasurementSchema)
    @blp.response(201, MeasurementSchema)
    def post(self, new_measurement):
        kit = KitModel.query.get(new_measurement["kit_id"])
        compartment = KitCompartmentModel.query.get(new_measurement["compartment_id"])
        if not kit:
            abort(404, message="Kit not found")
        if not compartment:
            abort(404, message="Compartment not found")
        new_measurement = MeasurementsModel(**new_measurement)
        db.session.add(new_measurement)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            abort(409, message="Measurement already exists")
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="Internal server error")
        return new_measurement