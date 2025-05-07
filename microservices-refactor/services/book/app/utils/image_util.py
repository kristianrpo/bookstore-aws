from werkzeug.utils import secure_filename
from flask import current_app
import os
from PIL import Image

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