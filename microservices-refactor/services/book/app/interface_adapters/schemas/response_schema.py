from marshmallow import Schema, fields

class ResponseSchema(Schema):
    message = fields.Str()