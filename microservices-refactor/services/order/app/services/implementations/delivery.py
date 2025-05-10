from app.services.interfaces.delivery import DeliveryServiceInterface
from app.database.interfaces.delivery_repository import DeliveryRepositoryInterface
from injector import inject

class DeliveryService(DeliveryServiceInterface):
    @inject
    def __init__(self, delivery_repository: DeliveryRepositoryInterface):
        self.delivery_repository = delivery_repository

    def list_deliveries(self):
        """Retrieve all deliveries providers."""
        return self.delivery_repository.get_all()

    def create_delivery(self, name: str, coverage_area: str, cost: float):
        """Create a new delivery provider with the given details."""
        return self.delivery_repository.create(name, coverage_area, cost)
