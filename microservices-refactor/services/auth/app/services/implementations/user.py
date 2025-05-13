from app.services.interfaces.user import UserServiceInterface
from app.database.interfaces.user_repository import UserRepositoryInterface
from injector import inject

class UserService(UserServiceInterface):
    @inject
    def __init__(self, user_repository: UserRepositoryInterface):
        self.user_repository = user_repository

    def get_all_users(self):
        return self.user_repository.get_all()
