from app.services.interfaces.payment import PaymentServiceInterface
from app.database.interfaces.payment_repository import PaymentRepositoryInterface
from app.database.interfaces.purchase_repository import PurchaseRepositoryInterface
from injector import inject
from app.settings.extensions import db

class PaymentService(PaymentServiceInterface):
    @inject
    def __init__(
        self,
        payment_repository: PaymentRepositoryInterface,
        purchase_repository: PurchaseRepositoryInterface
    ):
        self.payment_repository = payment_repository
        self.purchase_repository = purchase_repository

    def make_payment(self, purchase_id: int, amount: float, method: str):
        try:
            self.payment_repository.create_payment(purchase_id, amount, method)
            self.purchase_repository.update_status(purchase_id, "Paid")
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            return False