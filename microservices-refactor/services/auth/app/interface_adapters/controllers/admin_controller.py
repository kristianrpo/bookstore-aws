from flask import Blueprint, jsonify
from flask_login import login_required
from app.services.interfaces.user import UserServiceInterface
from app.settings.dependency_injector import injector

admin = Blueprint('admin', __name__, url_prefix='/objective-3')

@admin.route('/admin/users')
@login_required
def list_users():
    user_service = injector.get(UserServiceInterface)
    users = user_service.get_all_users()
    # Convertimos los objetos a diccionarios
    user_data = [{"id": u.id, "name": u.name, "email": u.email} for u in users]
    return jsonify(user_data)
