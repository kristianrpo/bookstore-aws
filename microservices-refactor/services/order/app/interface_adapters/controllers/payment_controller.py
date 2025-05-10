from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.services.interfaces.payment import PaymentServiceInterface
from app.services.interfaces.purchase import PurchaseServiceInterface
from app.settings.dependency_injector import injector

payment = Blueprint('payment', __name__, url_prefix='/objective-3/payment')

@payment.route('/<int:purchase_id>', methods=['GET', 'POST'])
@login_required
def payment_page(purchase_id):
    payment_service = injector.get(PaymentServiceInterface)
    purchase_service = injector.get(PurchaseServiceInterface)

    if request.method == 'POST':
        method = request.form.get('method')
        amount = request.form.get('amount')
        if not method or not amount:
            return jsonify({"message": "Missing payment method or amount"}), 400
        try:
            amount = float(amount)
        except ValueError:
            return jsonify({"message": "Invalid amount"}), 400

        result = payment_service.make_payment(purchase_id, amount, method)
        if result:
            return jsonify({
                "message": "Payment successful",
                "purchase_id": purchase_id,
                "amount": amount
            }), 200
        else:
            return jsonify({"message": "Payment failed"}), 400

    try:
        methods = ['Paypal', 'Credit Card', 'Debit Card']
        purchase = purchase_service.get_purchase_by_id(purchase_id)
        amount = purchase.total_price
    except Exception as e:
        return jsonify({"message": f"Error getting payment methods or purchase: {str(e)}"}), 500

    return jsonify({
        "message": "Ready to make payment",
        "purchase_id": purchase_id,
        "amount": amount,
        "methods": methods
    }), 200