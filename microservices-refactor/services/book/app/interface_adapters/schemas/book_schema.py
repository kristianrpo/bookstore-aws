from marshmallow import Schema, fields

class BookSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    author = fields.String(required=True)
    description = fields.String()
    price = fields.Float()
    stock = fields.Integer()
    seller_id = fields.Integer(dump_only=True)
    image_path = fields.String(dump_only=True)
    
class BooksListSchema(Schema):
    books = fields.List(fields.Nested(BookSchema))
