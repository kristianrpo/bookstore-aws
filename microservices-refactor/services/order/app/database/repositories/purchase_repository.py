from app.database.interfaces.purchase_repository import PurchaseRepositoryInterface
from app.database.entities.purchase import Purchase
from app.database.entities.book import Book
from app.settings.extensions import db
from flask import abort

class PurchaseRepository(PurchaseRepositoryInterface):
    def create_purchase(self, user_id: int, book_id: int, quantity: int, total_price: float, status: str):
        new_purchase = Purchase(
            user_id=user_id,
            book_id=book_id,
            quantity=quantity,
            total_price=total_price,
            status=status
        )
        db.session.add(new_purchase)
        return new_purchase

    def update_book_stock(self, book_id: int, quantity: int):
        book = Book.query.get_or_404(book_id)
        if book.stock < quantity:
            abort(400, "No hay suficiente stock disponible.")
        book.stock -= quantity
        return book

    def get_book_or_404(self, book_id: int):
        return Book.query.get_or_404(book_id)
    
    def update_status(self, purchase_id, status):
        purchase = Purchase.query.get(purchase_id)
        if purchase:
            purchase.status = status

    def get_purchase_by_id(self, purchase_id: int):
        return Purchase.query.get_or_404(purchase_id)
