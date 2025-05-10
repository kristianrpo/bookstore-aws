from abc import ABC, abstractmethod

class DeliveryAssignmentRepositoryInterface(ABC):
    @abstractmethod
    def create_assignment(self, purchase_id: int, provider_id: int) -> bool:
        """Create a delivery assignment entry."""
        pass