from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import login_required, current_user
from app.services.interfaces.purchase import PurchaseServiceInterface
from app.interface_adapters.schemas.purchase_schema import PurchaseSchema
from app.settings.dependency_injector import injector

purchase = Blueprint('purchase', __name__, url_prefix='/objective-3/purchase')

@purchase.route('/buy/<int:book_id>', methods=['POST'])
@login_required
def buy(book_id):
    quantity = int(request.form.get('quantity'))
    price = float(request.form.get('price'))

    purchase_service = injector.get(PurchaseServiceInterface)
    new_purchase = purchase_service.buy_book(current_user.id, book_id, quantity, price)
    amount = price * quantity

    return jsonify({"message": "Purchase created successfully", "purchase_id": new_purchase.id, "amount": amount})
    # schema = PurchaseSchema()
    # return jsonify(schema.dump(new_purchase)), 201 