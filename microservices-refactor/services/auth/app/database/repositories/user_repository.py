from app.settings.extensions import db
from app.database.interfaces.user_repository import UserRepositoryInterface
from app.database.entities.user import User

class UserRepository(UserRepositoryInterface):
    def create(self, name: str, email: str, password: str):
        hashed_password = password
        new_user = User(name=name, email=email, password=hashed_password)
        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return None
        return new_user
    
    def get_by_email(self, email: str):
        return User.query.filter_by(email=email).first()
    