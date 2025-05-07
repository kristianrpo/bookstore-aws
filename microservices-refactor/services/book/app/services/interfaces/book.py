from abc import ABC, abstractmethod

class BookServiceInterface(ABC):
    @abstractmethod
    def catalog():
        """Retrieve all books."""
        pass

    @abstractmethod
    def my_books():
        """Retrieve all books for a specific seller."""
        pass

    @abstractmethod
    def add_book(title: str, author: str, description: str, price: float, stock: int):
        """Create a new book with the given details."""
        pass

    @abstractmethod
    def edit_book(book_id: int, title: str, author: str, description: str, price: float, stock: int):
        """Update a book with the given attributes."""
        pass

    @abstractmethod
    def delete_book(book_id: int):
        """Delete a specific book given that its book_id."""
        pass

    @abstractmethod
    def get_book(book_id: int):
        """Retrieve a specific book given its book_id."""
        pass


