from app.database.interfaces.delivery_repository import DeliveryRepositoryInterface
from app.database.entities.delivery import DeliveryProvider
from app.settings.extensions import db
import logging

class DeliveryRepository(DeliveryRepositoryInterface):
    def get_all(self):
        return DeliveryProvider.query.all()

    def create(self, name: str, coverage_area: str, cost: float):
        new_delivery = DeliveryProvider(name=name, coverage_area=coverage_area, cost=cost)
        try:
            db.session.add(new_delivery)
            db.session.commit()
            return new_delivery  
        except Exception as e:
            db.session.rollback()
            logging.error(f"Error al crear la entrega: {e}") 
            return None

