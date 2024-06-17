from marshmallow import Schema, fields, post_load
from werkzeug.security import generate_password_hash, check_password_hash


class PlainAdminSchema(Schema):
    id = fields.Int(dump_only=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)

    @post_load
    def hash_password(self, data, **kwargs):
        if "password" in data:
            data["password"] = generate_password_hash(data["password"], method="pbkdf2:sha256")
        return data

class PlainKitSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    location = fields.Str(required=True)


class PlainMeasurementsSchema(Schema):
    id = fields.Int(dump_only=True)
    weight = fields.Float(required=True)
    timestamp = fields.Int(required=True)
    kit_id = fields.Int(required=True)
    compartment_id = fields.Int(required=True)


class PlainKitCompartmentSchema(Schema):
    kit_id = fields.Int(required=True)
    compartment_id = fields.Int(required=True)
    max_weight = fields.Float(required=True)


class KitCompartmentWeightUpdateSchema(Schema):
    weight = fields.Float(required=True)


class PlainNotificationSchema(Schema):
    id = fields.Int(dump_only=True)
    timestamp = fields.Int(dump_only=True)


class AdminSchema(PlainAdminSchema):
    kits = fields.List(fields.Nested(PlainKitSchema()), dump_only=True)
    notifications = fields.List(fields.Nested(PlainNotificationSchema()), dump_only=True)


class KitSchema(PlainKitSchema):
    admins = fields.List(fields.Nested(PlainAdminSchema()), dump_only=True)
    compartments = fields.List(fields.Nested(PlainKitCompartmentSchema()), dump_only=True)
    measurements = fields.List(fields.Nested(PlainMeasurementsSchema()), dump_only=True)
    notifications = fields.List(fields.Nested(PlainNotificationSchema()), dump_only=True)


class MeasurementSchema(PlainMeasurementsSchema):
    compartment = fields.Nested(PlainKitCompartmentSchema(), dump_only=True)


class KitCompartmentSchema(PlainKitCompartmentSchema):
    kit = fields.Nested(PlainKitSchema(), dump_only=True)
    measurements = fields.List(fields.Nested(PlainMeasurementsSchema()), dump_only=True)


class NotificationSchema(PlainNotificationSchema):
    kits = fields.List(fields.Nested(PlainKitSchema(), dump_only=True))
    admins = fields.List(fields.Nested(PlainAdminSchema(), dump_only=True))


class KitUpdateSchema(PlainKitSchema):
    name = fields.Str(required=False)
    location = fields.Str(required=False)


class AdminUpdateSchema(PlainAdminSchema):
    first_name = fields.Str(required=False)
    last_name = fields.Str(required=False)
    email = fields.Str(required=False)


class KitAdminSchema(Schema):
    kit_id = fields.Int(required=True)
    admin_id = fields.Int(required=True)


class AdminLoginSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)
