from app.database.interfaces.delivery_assignment_repository import DeliveryAssignmentRepositoryInterface
from app.database.entities.delivery_assignment import DeliveryAssignment
from app.settings.extensions import db

class DeliveryAssignmentRepository(DeliveryAssignmentRepositoryInterface):
    def create_assignment(self, purchase_id: int, provider_id: int) -> bool:
        try:
            assignment = DeliveryAssignment(purchase_id=purchase_id, provider_id=provider_id)
            db.session.add(assignment)
            db.session.commit()
            return True
        except Exception:
            db.session.rollback()
            return False
