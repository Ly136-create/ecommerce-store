from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from routes import products_bp, auth_bp, orders_bp

def create_app():
    """Create and configure the Flask application"""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Disable strict slashes to avoid redirect issues with CORS
    app.url_map.strict_slashes = False
    
    # Initialize extensions
    db.init_app(app)
    
    # Configure CORS with explicit settings
    CORS(app, 
     resources={r"/api/*": {"origins": "*"}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    # Configure JWT
    jwt = JWTManager(app)
    
    # Handle JWT errors gracefully
    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return jsonify({'error': 'Missing or invalid authorization token'}), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({'error': 'Invalid authorization token'}), 401
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({'error': 'Token has expired'}), 401
    
    # Register blueprints
    app.register_blueprint(products_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(orders_bp)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Health check endpoint
    @app.route('/')
    def index():
        return jsonify({
            'message': 'ShopHub API',
            'status': 'running',
            'version': '1.0.0'
        }), 200
    
    @app.route('/api/health')
    def health():
        return jsonify({'status': 'healthy'}), 200
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
