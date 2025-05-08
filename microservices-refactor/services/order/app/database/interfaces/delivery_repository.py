from abc import ABC, abstractmethod

class DeliveryRepositoryInterface(ABC):
    @abstractmethod
    def get_all(self):
        """ Retrieve all deliveries. """
        pass

    @abstractmethod
    def create(self, name: str, coverage_area: str, cost: float):
        """ Create a new delivery. """
        pass
