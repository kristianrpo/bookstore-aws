from app.database.interfaces.payment_repository import PaymentRepositoryInterface
from app.database.entities.payment import Payment
from app.settings.extensions import db

class PaymentRepository(PaymentRepositoryInterface):
    def create_payment(self, purchase_id: int, amount: float, payment_method: str):
        new_payment = Payment(
            purchase_id=purchase_id,
            amount=amount,
            payment_method=payment_method,
            payment_status='Paid'
        )
        db.session.add(new_payment)
        return new_payment
