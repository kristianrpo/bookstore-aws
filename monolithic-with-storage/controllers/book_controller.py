from flask import Blueprint, render_template, request, redirect, url_for, current_app, send_from_directory
from models.book import Book
import os
from werkzeug.utils import secure_filename
from extensions import db
#from app import db
from flask_login import login_required, current_user
from PIL import Image

book = Blueprint('book', __name__, url_prefix='/objective-2/book')  

#@book.route('/')
#@login_required
#def home():
#    return render_template('home.html')

#@book.route('/')
@book.route('/catalog')
def catalog():
    books = Book.query.all()
    return render_template('catalog.html', books=books)

@book.route('/my_books')
@login_required
def my_books():
    books = Book.query.filter_by(seller_id=current_user.id).all()
    return render_template('my_books.html', books=books)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_image(file, book_id):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_ext = filename.rsplit('.', 1)[1].lower()
        new_filename = f"book_{book_id}.{file_ext}"
        
        upload_dir = os.path.join(current_app.config['UPLOAD_FOLDER'], 'book_images')
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, new_filename)
        file.save(file_path)
        
        with Image.open(file_path) as img:
            if img.size[0] > 800 or img.size[1] > 800:
                img.thumbnail((800, 800))
                img.save(file_path)
        
        return f"book_images/{new_filename}"
    return None

@book.route('/image/<path:filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(current_app.config['UPLOAD_FOLDER'], 'book_images'), filename)

@book.route('/add_book', methods=['GET', 'POST'])
@login_required
def add_book():
    if request.method == 'POST':
        title = request.form.get('title')
        author = request.form.get('author')
        description = request.form.get('description')
        price = float(request.form.get('price'))
        stock = int(request.form.get('stock'))
        
        new_book = Book(
            title=title,
            author=author,
            description=description,
            price=price,
            stock=stock,
            seller_id=current_user.id
        )
        
        db.session.add(new_book)
        db.session.flush() 
        
        if 'image' in request.files:
            image_path = save_image(request.files['image'], new_book.id)
            if image_path:
                new_book.image_path = image_path
        
        db.session.commit()
        return redirect(url_for('book.catalog'))
    return render_template('add_book.html')

@book.route('/edit_book/<int:book_id>', methods=['GET', 'POST'])
@login_required
def edit_book(book_id):
    book_to_edit = Book.query.get_or_404(book_id)
    if book_to_edit.seller_id != current_user.id:
        return "No tienes permiso para editar este libro.", 403

    if request.method == 'POST':
        book_to_edit.title = request.form.get('title')
        book_to_edit.author = request.form.get('author')
        book_to_edit.description = request.form.get('description')
        book_to_edit.price = float(request.form.get('price'))
        book_to_edit.stock = int(request.form.get('stock'))
        
        if 'image' in request.files:
            image_path = save_image(request.files['image'], book_id)
            if image_path:
                if book_to_edit.image_path:
                    old_image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], book_to_edit.image_path)
                    if os.path.exists(old_image_path):
                        os.remove(old_image_path)
                book_to_edit.image_path = image_path
        
        db.session.commit()
        return redirect(url_for('book.catalog'))

    return render_template('edit_book.html', book=book_to_edit)

@book.route('/delete_book/<int:book_id>', methods=['POST'])
@login_required
def delete_book(book_id):
    book_to_delete = Book.query.get_or_404(book_id)
    if book_to_delete.seller_id != current_user.id:
        return "No tienes permiso para eliminar este libro.", 403

    if book_to_delete.image_path:
        image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], book_to_delete.image_path)
        if os.path.exists(image_path):
            os.remove(image_path)

    db.session.delete(book_to_delete)
    db.session.commit()
    return redirect(url_for('book.catalog'))
