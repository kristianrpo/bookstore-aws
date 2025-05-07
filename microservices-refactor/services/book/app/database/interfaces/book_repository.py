from abc import ABC, abstractmethod

class BookRepositoryInterface(ABC):
    @abstractmethod
    def get_all(self):
        """ Retrieve all books. """
        pass

    @abstractmethod
    def get_by_seller_id(self, seller_id: int):
        """ Retrieve all books for a specific seller. """
        pass

    @abstractmethod
    def get_by_id(self, book_id: int):
        """ Retrieve a specific book given its book_id. """
        pass

    @abstractmethod
    def create(self, title: str, author: str, description: str, price: float, stock: int, seller_id: int, files: dict):
        """ Create a new book with the given details. """
        pass

    @abstractmethod
    def update(self, title: str, author: str, description: str, price: str, stock: int, seller_id: int, files: dict):
        """ Update a book with the given attributes """
        pass

    @abstractmethod
    def delete(self, book_id: int):
        """ Delete a specific book given that its book_id """
        pass
    