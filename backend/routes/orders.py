from flask import Blueprint, request, jsonify
from models import db, Order, OrderItem, Product
from flask_jwt_extended import jwt_required, get_jwt_identity

orders_bp = Blueprint('orders', __name__, url_prefix='/api/orders')

@orders_bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    """Get all orders for the current user"""
    try:
        user_id = get_jwt_identity()
        orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
        return jsonify([order.to_dict() for order in orders]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@orders_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    """Get a single order by ID"""
    try:
        user_id = get_jwt_identity()
        order = Order.query.filter_by(id=order_id, user_id=user_id).first()
        
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        return jsonify(order.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@orders_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    """Create a new order"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['items', 'total', 'fullName', 'email', 'address', 'city', 'zipCode', 'country']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate items
        if not data['items'] or len(data['items']) == 0:
            return jsonify({'error': 'Order must contain at least one item'}), 400
        
        # Create order
        order = Order(
            user_id=user_id,
            total=data['total'],
            full_name=data['fullName'],
            email=data['email'],
            address=data['address'],
            city=data['city'],
            zip_code=data['zipCode'],
            country=data['country'],
            status='pending'
        )
        
        db.session.add(order)
        db.session.flush()  # Get the order ID
        
        # Add order items and update product stock
        for item_data in data['items']:
            # Validate product exists and has enough stock
            product = Product.query.get(item_data['productId'])
            if not product:
                db.session.rollback()
                return jsonify({'error': f'Product {item_data["productId"]} not found'}), 404
            
            if product.stock < item_data['quantity']:
                db.session.rollback()
                return jsonify({'error': f'Not enough stock for {product.name}'}), 400
            
            # Create order item
            order_item = OrderItem(
                order_id=order.id,
                product_id=item_data['productId'],
                quantity=item_data['quantity'],
                price=item_data['price']
            )
            db.session.add(order_item)
            
            # Update product stock
            product.stock -= item_data['quantity']
        
        db.session.commit()
        
        return jsonify(order.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@orders_bp.route('/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    """Update order status (admin only)"""
    try:
        data = request.get_json()
        
        if 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
        
        order = Order.query.get(order_id)
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        order.status = data['status']
        db.session.commit()
        
        return jsonify(order.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@orders_bp.route('/<int:order_id>', methods=['DELETE'])
@jwt_required()
def cancel_order(order_id):
    """Cancel an order"""
    try:
        user_id = get_jwt_identity()
        order = Order.query.filter_by(id=order_id, user_id=user_id).first()
        
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        if order.status != 'pending':
            return jsonify({'error': 'Can only cancel pending orders'}), 400
        
        # Restore product stock
        for item in order.items:
            product = Product.query.get(item.product_id)
            if product:
                product.stock += item.quantity
        
        # Delete order
        db.session.delete(order)
        db.session.commit()
        
        return jsonify({'message': 'Order cancelled successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
