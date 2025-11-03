"""Seed database with sample data"""
from app import create_app
from models import db, Product, User

def seed_database():
    """Add sample products and users to the database"""
    app = create_app()
    
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        print("Creating sample products...")
        
        # Sample products matching the frontend
        products = [
            Product(
                name='Wireless Headphones',
                description='Premium noise-cancelling wireless headphones with 30-hour battery life',
                price=199.99,
                stock=15,
                image_url='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
            ),
            Product(
                name='Smart Watch',
                description='Fitness tracker with heart rate monitor and GPS',
                price=299.99,
                stock=8,
                image_url='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
            ),
            Product(
                name='Laptop Stand',
                description='Ergonomic aluminum laptop stand for better posture',
                price=49.99,
                stock=25,
                image_url='https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'
            ),
            Product(
                name='Mechanical Keyboard',
                description='RGB backlit mechanical keyboard with blue switches',
                price=129.99,
                stock=12,
                image_url='https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop'
            ),
            Product(
                name='Wireless Mouse',
                description='Ergonomic wireless mouse with precision tracking',
                price=39.99,
                stock=30,
                image_url='https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop'
            ),
            Product(
                name='USB-C Hub',
                description='7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
                price=59.99,
                stock=20,
                image_url='https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop'
            ),
            Product(
                name='Portable SSD',
                description='1TB portable SSD with USB-C connectivity',
                price=149.99,
                stock=0,
                image_url='https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop'
            ),
            Product(
                name='Webcam HD',
                description='1080p HD webcam with built-in microphone',
                price=79.99,
                stock=18,
                image_url='https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop'
            ),
        ]
        
        for product in products:
            db.session.add(product)
        
        print("Creating sample users...")
        
        # Create a test user
        user = User(
            name='Test User',
            email='test@example.com',
            role='customer'
        )
        user.set_password('password123')
        db.session.add(user)
        
        # Create an admin user
        admin = User(
            name='Admin User',
            email='admin@example.com',
            role='admin'
        )
        admin.set_password('admin123')
        db.session.add(admin)
        
        db.session.commit()
        
        print(f"Database seeded successfully!")
        print(f"   - Added {len(products)} products")
        print(f"   - Added 2 users")
        print(f"\nTest credentials:")
        print(f"   Customer: test@example.com / password123")
        print(f"   Admin: admin@example.com / admin123")

if __name__ == '__main__':
    seed_database()
