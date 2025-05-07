from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from flask_login import login_required
from app.services.interfaces.book import BookServiceInterface
from app.settings.dependency_injector import injector
from app.interface_adapters.schemas.book_schema import BooksListSchema
from app.interface_adapters.schemas.response_schema import ResponseSchema

book = Blueprint('book', __name__, url_prefix='/objective-2/book')  

@book.route('/catalog')
def catalog():
    book_service = injector.get(BookServiceInterface)
    books = book_service.catalog()

    if books:
        book_schema = BooksListSchema()
        return jsonify(book_schema.dump({"books": books})), 200

    else:
        response_schema = ResponseSchema()
        return jsonify(response_schema.dump({"message": "Books not found"})), 404


@book.route('/my_books')
@login_required
def my_books():
    book_service = injector.get(BookServiceInterface)
    books = book_service.my_books()

    if books:
        book_schema = BooksListSchema()
        return jsonify(book_schema.dump({"books": books})), 200

    else:
        response_schema = ResponseSchema()
        return jsonify(response_schema.dump({"message": "Books not found"})), 404


@book.route('/add_book', methods=['POST'])
@login_required
def add_book():
    title = request.form.get('title')
    author = request.form.get('author')
    description = request.form.get('description')
    price = float(request.form.get('price'))
    stock = int(request.form.get('stock'))

    book_service = injector.get(BookServiceInterface)
    result = book_service.add_book(title, author, description, price, stock)

    response_schema = ResponseSchema()
    if result:
        return jsonify(response_schema.dump({"message": "Book added successfully"})), 201
    else:
        return jsonify(response_schema.dump({"message": "Book addition failed"})), 400



@book.route('/edit_book/<int:book_id>', methods=['POST'])
@login_required
def edit_book(book_id):
    title = request.form.get('title')
    author = request.form.get('author')
    description = request.form.get('description')
    price = float(request.form.get('price'))
    stock = int(request.form.get('stock'))

    book_service = injector.get(BookServiceInterface)
    result = book_service.edit_book(book_id, title, author, description, price, stock)

    response_schema = ResponseSchema()
    if result:
        return jsonify(response_schema.dump({"message": "Book edited successfully"})), 201
    else:
        return jsonify(response_schema.dump({"message": "Book edit failed, maybe you don't have access to edit this book"})), 400

    
@book.route('/delete_book/<int:book_id>', methods=['POST'])
@login_required
def delete_book(book_id):
    book_service = injector.get(BookServiceInterface)
    result = book_service.delete_book(book_id)

    response_schema = ResponseSchema()
    if result:
        return jsonify(response_schema.dump({"message": "Book deleted successfully"})), 201
    else:
        return jsonify(response_schema.dump({"message": "Book deleted failed, maybe you don't have access to delete this book"})), 400






