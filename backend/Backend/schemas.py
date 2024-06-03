from marshmallow import Schema, fields


class PlainAdminSchema(Schema):
    id = fields.Int(dump_only=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Str(required=True)


class PlainKitSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    location = fields.Str(required=True)


class PlainMeasurementsSchema(Schema):
    id = fields.Int(dump_only=True)
    weight = fields.Float(required=True)
    timestamp = fields.DateTime(required=True)
    kit_id = fields.Int(required=True)
    compartment_id = fields.Int(required=True)


class PlainKitCompartmentSchema(Schema):
    kit_id = fields.Int(required=True)
    compartment_id = fields.Int(required=True)


class PlainNotificationSchema(Schema):
    id = fields.Int(dump_only=True)
    timestamp = fields.DateTime(dump_only=True)


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
    kit = fields.Nested(PlainKitSchema(), dump_only=True)
    admin = fields.Nested(PlainAdminSchema(), dump_only=True)


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
