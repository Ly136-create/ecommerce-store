# ShopHub E-commerce Store

A full-stack e-commerce application built with Flask (Backend) and React + TypeScript (Frontend).

## Features

### Frontend
- ✅ Modern React UI with TailwindCSS v4
- ✅ Product browsing and search
- ✅ Shopping cart functionality
- ✅ User authentication (Login/Register)
- ✅ Checkout process
- ✅ Responsive design

### Backend
- ✅ Flask REST API
- ✅ JWT authentication
- ✅ Product CRUD operations
- ✅ Order management
- ✅ User authentication
- ✅ SQLite database

## Quick Start

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. **Windows:** Run the startup script:
```bash
run.bat
```

**Or manually:**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Seed database
python seed_data.py

# Run server
python app.py
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5175`

## Test Credentials

After seeding the database, you can login with:

**Customer Account:**
- Email: `test@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/<id>` - Get single product
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/<id>` - Update product (auth required)
- `DELETE /api/products/<id>` - Delete product (auth required)
- `GET /api/products/search?q=<query>` - Search products

### Orders
- `GET /api/orders` - Get user orders (auth required)
- `GET /api/orders/<id>` - Get single order (auth required)
- `POST /api/orders` - Create order (auth required)
- `PUT /api/orders/<id>/status` - Update order status (auth required)
- `DELETE /api/orders/<id>` - Cancel order (auth required)

## Project Structure

```
ecommerce-store/
├── backend/                 # Flask backend
│   ├── routes/             # API routes
│   │   ├── products.py     # Product endpoints
│   │   ├── auth.py         # Auth endpoints
│   │   └── orders.py       # Order endpoints
│   ├── app.py              # Main Flask app
│   ├── models.py           # Database models
│   ├── config.py           # Configuration
│   ├── seed_data.py        # Database seeding
│   ├── requirements.txt    # Python dependencies
│   └── run.bat             # Windows startup script
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── context/        # React context
    │   ├── services/       # API services
    │   └── index.css       # TailwindCSS styles
    ├── package.json        # Node dependencies
    └── vite.config.ts      # Vite configuration
```

## Technologies Used

### Frontend
- React 19
- TypeScript
- TailwindCSS v4
- React Router
- Axios
- Vite

### Backend
- Flask 3.0
- SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS
- SQLite

## Development

### Backend Development
The backend uses Flask with SQLAlchemy ORM. To make changes:
- Models are in `models.py`
- Routes are in the `routes/` folder
- Configuration is in `config.py`

### Frontend Development
The frontend uses React with TypeScript. To make changes:
- Components are in `src/components/`
- Pages are in `src/pages/`
- API services are in `src/services/`
- Styles use TailwindCSS

## License

MIT
