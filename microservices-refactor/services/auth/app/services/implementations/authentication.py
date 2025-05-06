from app.services.interfaces.authentication import AuthenticationServiceInterface
from app.database.interfaces.user_repository import UserRepositoryInterface
from flask_login import login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from injector import inject

class AuthenticationService(AuthenticationServiceInterface):
    @inject
    def __init__(self, user_repository: UserRepositoryInterface):
        self.user_repository = user_repository
    
    def register(self, name: str, email: str, password: str) -> bool:
        try:
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
            user = self.user_repository.create(name, email, hashed_password)
            if user:
                return True
            else:
                return False
        except:
            return False

    def login(self, email: str, password: str) -> bool:
        try:
            user = self.user_repository.get_by_email(email)
            is_correct_password = check_password_hash(user.password, password)
            if user and is_correct_password:
                login_user(user)
                return True
            else:
                return False
        except:
            return False
        
    def logout(self) -> bool:
        try:
            logout_user()  
            return True
        except:
            return False
