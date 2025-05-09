from marshmallow import Schema, fields

class DeliveryAssignmentSchema(Schema):
    id = fields.Integer(dump_only=True)
    purchase_id = fields.Integer(required=True)
    provider_id = fields.Integer(required=True)
