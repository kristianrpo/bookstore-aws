from injector import Injector, Module, singleton
from app.database.interfaces.delivery_repository import DeliveryRepositoryInterface
from app.database.repositories.delivery_repository import DeliveryRepository
from app.services.interfaces.delivery import DeliveryServiceInterface
from app.services.implementations.delivery import DeliveryService

from app.database.interfaces.purchase_repository import PurchaseRepositoryInterface
from app.database.repositories.purchase_repository import PurchaseRepository
from app.services.interfaces.purchase import PurchaseServiceInterface
from app.services.implementations.purchase import PurchaseService

from app.database.interfaces.payment_repository import PaymentRepositoryInterface
from app.database.repositories.payment_repository import PaymentRepository
from app.services.interfaces.payment import PaymentServiceInterface
from app.services.implementations.payment import PaymentService


from app.database.interfaces.delivery_assignment_repository import DeliveryAssignmentRepositoryInterface
from app.database.repositories.delivery_assignment_repository import DeliveryAssignmentRepository
from app.services.interfaces.delivery_assignment import DeliveryAssignmentServiceInterface
from app.services.implementations.delivery_assignment import DeliveryAssignmentService


class AppModule(Module):
    def configure(self, binder):
        binder.bind(DeliveryRepositoryInterface, to=DeliveryRepository, scope=singleton)
        binder.bind(DeliveryServiceInterface, to=DeliveryService, scope=singleton)

        binder.bind(PurchaseRepositoryInterface, to=PurchaseRepository, scope=singleton)
        binder.bind(PurchaseServiceInterface, to=PurchaseService, scope=singleton)

        binder.bind(PaymentRepositoryInterface, to=PaymentRepository, scope=singleton)
        binder.bind(PaymentServiceInterface, to=PaymentService, scope=singleton)

        binder.bind(DeliveryAssignmentRepositoryInterface, to=DeliveryAssignmentRepository, scope=singleton)
        binder.bind(DeliveryAssignmentServiceInterface, to=DeliveryAssignmentService, scope=singleton)
        
injector = Injector([AppModule()])
