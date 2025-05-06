from marshmallow import Schema, fields, validate

class LoginSchema(Schema):
    email = fields.Email(required=True, validate=validate.Length(min=1))
    password = fields.Str(required=True, validate=validate.Length(min=1))