from abc import ABC, abstractmethod

class PaymentServiceInterface(ABC):
    @abstractmethod
    def make_payment(self, purchase_id: int, amount: float, method: str):
        pass
