from app.services.interfaces.delivery_assignment import DeliveryAssignmentServiceInterface
from app.database.interfaces.delivery_assignment_repository import DeliveryAssignmentRepositoryInterface
from injector import inject

class DeliveryAssignmentService(DeliveryAssignmentServiceInterface):
    @inject
    def __init__(self, repository: DeliveryAssignmentRepositoryInterface):
        self.repository = repository

    def assign_provider_to_purchase(self, purchase_id: int, provider_id: int) -> bool:
        return self.repository.create_assignment(purchase_id, provider_id)