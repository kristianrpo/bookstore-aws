from abc import ABC, abstractmethod

class PaymentRepositoryInterface(ABC):
    @abstractmethod
    def create_payment(self, purchase_id: int, amount: float, payment_method: str):
        pass
