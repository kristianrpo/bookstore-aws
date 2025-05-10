from abc import ABC, abstractmethod

class PurchaseRepositoryInterface(ABC):
    @abstractmethod
    def create_purchase(self, user_id: int, book_id: int, quantity: int, total_price: float, status: str):
        """Creates a new purchase record."""
        pass

    @abstractmethod
    def update_book_stock(self, book_id: int, quantity: int):
        """Decreases the book's stock by the given quantity."""
        pass

    @abstractmethod
    def get_book_or_404(self, book_id: int):
        """Gets a book by ID or raises 404."""
        pass

    @abstractmethod
    def update_status(self, purchase_id, status):
        """Updates the status of a purchase."""
        pass