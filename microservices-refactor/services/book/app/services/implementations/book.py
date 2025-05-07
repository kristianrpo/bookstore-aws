from flask_login import current_user
from app.services.interfaces.book import BookServiceInterface
from app.database.interfaces.book_repository import BookRepositoryInterface
from injector import inject
class BookService(BookServiceInterface):
    @inject
    def __init__(self, book_repository: BookRepositoryInterface):
        self.book_repository = book_repository

    def catalog(self):
        return self.book_repository.get_all()

    def my_books(self):
        seller_id = current_user.id
        return self.book_repository.get_by_seller_id(seller_id)

    def add_book(self, title: str, author: str, description: str, price: float, stock: int):
        seller_id = current_user.id
        return self.book_repository.create(title, author, description, price, stock, seller_id)

    def edit_book(self, book_id: int, title: str, author: str, description: str, price: float, stock: int):
        seller_id = current_user.id
        return self.book_repository.update(book_id, title, author, description, price, stock, seller_id)

    def delete_book(self, book_id: int):
        return self.book_repository.delete(book_id)
    
    def get_book(self, book_id: int):
        return self.book_repository.get_by_id(book_id)
