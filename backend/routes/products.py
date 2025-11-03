from flask import Blueprint, request, jsonify
from models import db, Product
from flask_jwt_extended import jwt_required, get_jwt_identity

products_bp = Blueprint('products', __name__, url_prefix='/api/products')

@products_bp.route('/', methods=['GET'])
def get_products():
    """Get all products"""
    try:
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a single product by ID"""
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        return jsonify(product.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@products_bp.route('/', methods=['POST'])
@jwt_required()
def create_product():
    """Create a new product (admin only)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'description', 'price', 'stock']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            stock=data['stock'],
            image_url=data.get('imageUrl', '')
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify(product.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@products_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    """Update a product (admin only)"""
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            product.name = data['name']
        if 'description' in data:
            product.description = data['description']
        if 'price' in data:
            product.price = data['price']
        if 'stock' in data:
            product.stock = data['stock']
        if 'imageUrl' in data:
            product.image_url = data['imageUrl']
        
        db.session.commit()
        
        return jsonify(product.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@products_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    """Delete a product (admin only)"""
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@products_bp.route('/search', methods=['GET'])
def search_products():
    """Search products by name or description"""
    try:
        query = request.args.get('q', '')
        if not query:
            return jsonify([]), 200
        
        products = Product.query.filter(
            db.or_(
                Product.name.ilike(f'%{query}%'),
                Product.description.ilike(f'%{query}%')
            )
        ).all()
        
        return jsonify([product.to_dict() for product in products]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
