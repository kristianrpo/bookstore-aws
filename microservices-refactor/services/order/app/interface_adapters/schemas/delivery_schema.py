from marshmallow import Schema, fields

class DeliveryProviderSchema(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    coverage_area = fields.String(required=True)
    cost = fields.Float(required=True)

class DeliveriesListSchema(Schema):
    deliveries = fields.List(fields.Nested(DeliveryProviderSchema))

class ResponseSchema(Schema):
    message = fields.String(required=True)
    status = fields.String()
    data = fields.Nested(DeliveriesListSchema, required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'status' not in kwargs:
            self.fields['status'].default = 'success'