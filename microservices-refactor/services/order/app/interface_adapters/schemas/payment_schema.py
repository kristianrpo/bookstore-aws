from marshmallow import Schema, fields

class PaymentSchema(Schema):
    id = fields.Integer(dump_only=True)
    purchase_id = fields.Integer(required=True)
    amount = fields.Float(required=True)
    payment_method = fields.String(required=True)
    payment_status = fields.String(required=True)
