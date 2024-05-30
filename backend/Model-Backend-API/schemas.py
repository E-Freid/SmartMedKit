from marshmallow import Schema, fields


class PlainAdminSchema(Schema):
    id = fields.Int(dump_only=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    phone_num = fields.Str(required=True)


class PlainKitSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    location = fields.Str(required=True)


class AdminSchema(PlainAdminSchema):
    kits = fields.List(fields.Nested(PlainKitSchema()), dump_only=True)


class KitSchema(PlainKitSchema):
    admins = fields.List(fields.Nested(PlainAdminSchema()), dump_only=True)


class KitUpdateSchema(PlainKitSchema):
    name = fields.Str(required=False)
    location = fields.Str(required=False)


class AdminUpdateSchema(PlainAdminSchema):
    first_name = fields.Str(required=False)
    last_name = fields.Str(required=False)
    phone_num = fields.Str(required=False)


class KitAdminSchema(Schema):
    kit_id = fields.Int(required=True)
    admin_id = fields.Int(required=True)