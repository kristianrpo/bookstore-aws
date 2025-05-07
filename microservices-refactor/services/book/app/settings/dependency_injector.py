from injector import Injector, Module, singleton
from app.database.interfaces.book_repository import BookRepositoryInterface
from app.database.repositories.book_repository import BookRepository
from app.services.interfaces.book import BookServiceInterface
from app.services.implementations.book import BookService

class AppModule(Module):
    def configure(self, binder):
        binder.bind(BookRepositoryInterface, to=BookRepository, scope=singleton)
        binder.bind(BookServiceInterface, to=BookService, scope=singleton)
        
injector = Injector([AppModule()])
