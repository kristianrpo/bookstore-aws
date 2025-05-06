from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from flask_login import login_required
from app.services.interfaces.authentication import AuthenticationServiceInterface
from app.settings.dependency_injector import injector
from app.interface_adapters.schemas.register_schema import RegisterSchema
from app.interface_adapters.schemas.login_schema import LoginSchema
from app.interface_adapters.schemas.response_schema import ResponseSchema
auth = Blueprint('auth', __name__, url_prefix='/objective-2')

@auth.route('/login', methods=['POST'])
def login():
    schema = LoginSchema()
    response_schema = ResponseSchema()
    try:
        data = schema.load(request.form)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    email = data['email']
    password = data['password']
    
    auth_service = injector.get(AuthenticationServiceInterface)
    result = auth_service.login(email, password)
    if result:
        return jsonify(response_schema.dump({"message": "Login successful"})), 200
    else:
        return jsonify(response_schema.dump({"message": "Login failed"})), 400

@auth.route('/register', methods=['POST'])
def register():
    schema = RegisterSchema()
    response_schema = ResponseSchema()
    try:
        data = schema.load(request.form)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    name = data['name']
    email = data['email']
    password = data['password']

    auth_service = injector.get(AuthenticationServiceInterface)

    result = auth_service.register(name, email, password)

    if result:
        return jsonify(response_schema.dump({"message": "User registered successfully"})), 201
    else:
        return jsonify(response_schema.dump({"message": "Registration failed"})), 400

@auth.route('/logout')
@login_required
def logout():
    response_schema = ResponseSchema()
    auth_service = injector.get(AuthenticationServiceInterface)

    result = auth_service.logout()
    if result:
        return jsonify(response_schema.dump({"message": "Logout successful"})), 200
    else:
        return jsonify(response_schema.dump({"message": "Logout failed"})), 400
