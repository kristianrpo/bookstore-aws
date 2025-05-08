from abc import ABC, abstractmethod

class DeliveryServiceInterface(ABC):
    @abstractmethod
    def list_deliveries(self):
        """Retrieve all deliveries providers."""
        pass

    @abstractmethod
    def create_delivery(self, name: str, coverage_area: str, cost: float):
        """Create a new delivery provider with the given details."""
        pass
