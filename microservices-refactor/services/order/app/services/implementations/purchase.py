from app.services.interfaces.purchase import PurchaseServiceInterface
from app.services.interfaces.purchase import PurchaseServiceInterface
from app.database.interfaces.purchase_repository import PurchaseRepositoryInterface
from injector import inject
from app.settings.extensions import db

class PurchaseService(PurchaseServiceInterface):
    @inject
    def __init__(self, purchase_repository: PurchaseRepositoryInterface):
        self.purchase_repository = purchase_repository

    def buy_book(self, user_id: int, book_id: int, quantity: int, price: float):
        total_price = price * quantity
        self.purchase_repository.update_book_stock(book_id, quantity)
        purchase = self.purchase_repository.create_purchase(user_id, book_id, quantity, total_price, 'Pending Payment')
        db.session.commit()
        return purchase
