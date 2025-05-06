from flask import Flask
from app.settings.extensions import db, login_manager
from app.settings.config import Config
from app.interface_adapters.controllers.authentication_controller import auth
from app.database.entities.user import User

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)
    
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    app.register_blueprint(auth)

    return app
