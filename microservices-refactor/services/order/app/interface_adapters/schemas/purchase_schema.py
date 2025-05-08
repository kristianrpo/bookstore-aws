from marshmallow import Schema, fields

class PurchaseSchema(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(required=True)
    book_id = fields.Integer(required=True)
    quantity = fields.Integer(required=True)
    total_price = fields.Float(required=True)
    status = fields.String(required=True)
