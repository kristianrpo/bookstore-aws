from abc import ABC, abstractmethod

class PurchaseServiceInterface(ABC):
    @abstractmethod
    def buy_book(self, user_id: int, book_id: int, quantity: int, price: float):
        """Handles the book purchase process."""
        pass
