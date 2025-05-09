from abc import ABC, abstractmethod

class DeliveryAssignmentServiceInterface(ABC):
    @abstractmethod
    def assign_provider_to_purchase(self, purchase_id: int, provider_id: int) -> bool:
        """Assign a delivery provider to a purchase."""
        pass