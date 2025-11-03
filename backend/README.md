# ShopHub Backend API

Flask REST API for the ShopHub e-commerce application.

## Features

- ✅ Product CRUD operations
- ✅ User authentication (Register/Login)
- ✅ Order management
- ✅ JWT-based authentication
- ✅ CORS enabled
- ✅ SQLite database

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
```

5. Seed the database with sample data:
```bash
python seed_data.py
```

6. Run the application:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)
- `POST /api/auth/logout` - Logout user (requires authentication)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/<id>` - Get a single product
- `POST /api/products` - Create a product (requires authentication)
- `PUT /api/products/<id>` - Update a product (requires authentication)
- `DELETE /api/products/<id>` - Delete a product (requires authentication)
- `GET /api/products/search?q=<query>` - Search products

### Orders
- `GET /api/orders` - Get all orders for current user (requires authentication)
- `GET /api/orders/<id>` - Get a single order (requires authentication)
- `POST /api/orders` - Create a new order (requires authentication)
- `PUT /api/orders/<id>/status` - Update order status (requires authentication)
- `DELETE /api/orders/<id>` - Cancel an order (requires authentication)

## Test Credentials

After running `seed_data.py`, you can use these credentials:

**Customer Account:**
- Email: `test@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── config.py           # Configuration settings
├── models.py           # Database models
├── seed_data.py        # Database seeding script
├── requirements.txt    # Python dependencies
├── routes/
│   ├── __init__.py
│   ├── products.py     # Product routes
│   ├── auth.py         # Authentication routes
│   └── orders.py       # Order routes
└── .env                # Environment variables
```

## Environment Variables

- `DATABASE_URL` - Database connection string
- `JWT_SECRET_KEY` - Secret key for JWT tokens
- `FLASK_ENV` - Environment (development/production)
- `FLASK_DEBUG` - Enable debug mode

## Development

The application uses SQLite by default. For production, update the `DATABASE_URL` in `.env` to use PostgreSQL or MySQL.
