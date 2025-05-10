from flask import Blueprint, request, jsonify, redirect, url_for, render_template
from flask_login import login_required
from app.services.interfaces.delivery import DeliveryServiceInterface
from app.services.interfaces.delivery_assignment import DeliveryAssignmentServiceInterface
from app.settings.dependency_injector import injector
from app.interface_adapters.schemas.delivery_schema import DeliveriesListSchema, ResponseSchema
from app.interface_adapters.schemas.delivery_assigment_schema import DeliveryAssignmentSchema

delivery = Blueprint('delivery', __name__, url_prefix='/objective-3/delivery')

@delivery.route('/select/<int:purchase_id>', methods=['GET', 'POST'])
@login_required
def select_delivery(purchase_id):
    delivery_service = injector.get(DeliveryServiceInterface)
    assignment_service = injector.get(DeliveryAssignmentServiceInterface)

    if request.method == 'POST':
        form_data = {
            "purchase_id": purchase_id,
            "provider_id": request.form.get("provider_id")
        }

        schema = DeliveryAssignmentSchema()
        errors = schema.validate(form_data)

        if errors:
            return jsonify({"errors": errors}), 400

        success = assignment_service.assign_provider_to_purchase(
            purchase_id=form_data["purchase_id"],
            provider_id=int(form_data["provider_id"]) 
        )

        if success:
            return jsonify({"message": "Delivery assigned successfully"}), 200
        else:
            return jsonify({"message": "Failed to assign delivery"}), 400

    deliveries = delivery_service.list_deliveries()
    schema = DeliveriesListSchema()
    return jsonify({
        "message": "Delivery assigned successfully",
        "providers": schema.dump({"deliveries": deliveries})["deliveries"],
        "purchase_id": purchase_id
    }), 200

@delivery.route('/my_deliveries')
@login_required
def my_deliveries():
    """Retrieve all deliveries providers."""
    delivery_service = injector.get(DeliveryServiceInterface)
    deliveries = delivery_service.list_deliveries()

    if deliveries:
        schema = DeliveriesListSchema()
        return jsonify(schema.dump({"deliveries": deliveries})), 200
    else:
        return jsonify(ResponseSchema().dump({"message": "No deliveries found"})), 404

@delivery.route('/create', methods=['POST'])
@login_required
def create_delivery():
    """Create a new delivery provider."""
    name = request.form.get('name')
    coverage_area = request.form.get('coverage_area')
    cost = request.form.get('cost')

    delivery_service = injector.get(DeliveryServiceInterface)
    result = delivery_service.create_delivery(name, coverage_area, cost)

    if result:
        return jsonify(ResponseSchema().dump({"message": "Delivery created successfully"})), 201
    else:
        return jsonify(ResponseSchema().dump({"message": "Failed to create delivery"})), 400
