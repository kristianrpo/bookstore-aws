from injector import Injector, Module, singleton
from app.database.repositories.user_repository import UserRepository
from app.database.interfaces.user_repository import UserRepositoryInterface
from app.services.implementations.authentication import AuthenticationService
from app.services.interfaces.authentication import AuthenticationServiceInterface
from app.services.implementations.user import UserService         
from app.services.interfaces.user import UserServiceInterface

class AppModule(Module):
    def configure(self, binder):
        binder.bind(UserRepositoryInterface, to=UserRepository, scope=singleton)
        binder.bind(AuthenticationServiceInterface, to=AuthenticationService, scope=singleton)
        binder.bind(UserServiceInterface, to=UserService, scope=singleton)
        
injector = Injector([AppModule()])
