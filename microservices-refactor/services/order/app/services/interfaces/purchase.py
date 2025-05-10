from abc import ABC, abstractmethod

class PurchaseServiceInterface(ABC):
    @abstractmethod
    def buy_book(self, user_id: int, book_id: int, quantity: int, price: float):
        """Handles the book purchase process."""
        pass

    @abstractmethod
    def get_purchase_by_id(self, purchase_id: int):
        """Gets a purchase by ID or raises 404."""
        pass
