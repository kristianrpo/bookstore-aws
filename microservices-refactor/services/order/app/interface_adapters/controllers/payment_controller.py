from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from flask_login import login_required
from app.services.interfaces.payment import PaymentServiceInterface
from app.settings.dependency_injector import injector

payment = Blueprint('payment', __name__, url_prefix='/objective-3/payment')

@payment.route('/<int:purchase_id>', methods=['GET', 'POST'])
@login_required
def payment_page(purchase_id):
    if request.method == 'POST':
        method = request.form.get('method')
        amount = float(request.form.get('amount'))

        payment_service = injector.get(PaymentServiceInterface)
        payment_service.make_payment(purchase_id, amount, method)

        return redirect(url_for('delivery.select_delivery', purchase_id=purchase_id))

    return render_template('payment.html', purchase_id=purchase_id)
    # return jsonify({"message": "Ready to make payment", "purchase_id": purchase_id})