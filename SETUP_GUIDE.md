# ShopHub Setup Guide

## What Was Created

### Backend (Flask API)
✅ Complete REST API with CRUD operations
✅ Database models (User, Product, Order, OrderItem)
✅ JWT authentication system
✅ CORS enabled for frontend connection
✅ Sample data seeding script
✅ SQLite database with 8 products and 2 test users

### Frontend Updates
✅ API service layer (`src/services/api.ts`)
✅ Connected Home page to fetch products from backend
✅ Connected AuthContext to backend authentication
✅ Connected Checkout page to create orders via backend
✅ Added loading and error states
✅ Fixed TailwindCSS v4 configuration issues

## Running the Application

### Step 1: Start Backend (Already Running!)
The backend is currently running at: **http://localhost:5000**

To start it manually later:
```bash
cd backend
run.bat
# Or: venv\Scripts\python.exe app.py
```

### Step 2: Start Frontend (Already Running!)
The frontend is running at: **http://localhost:5175**

If you need to restart:
```bash
cd frontend
npm run dev
```

## Test the Application

### 1. View Products
- Open http://localhost:5175
- You should see 8 products loaded from the backend
- Try searching for products

### 2. Register New User
- Click "Sign Up" in the header
- Create a new account
- You'll be automatically logged in

### 3. Login with Test Accounts
**Customer:**
- Email: test@example.com
- Password: password123

**Admin:**
- Email: admin@example.com
- Password: admin123

### 4. Add to Cart
- Browse products
- Click "Add to Cart" on any product
- View cart by clicking the cart icon

### 5. Checkout
- Go to cart
- Click "Proceed to Checkout"
- Fill in the shipping information
- Complete the order
- Order will be saved in the database!

## API Testing

### Test Backend API Directly

**Get all products:**
```bash
curl http://localhost:5000/api/products
```

**Register user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"newuser@test.com\",\"password\":\"password123\"}"
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

## File Structure

### Backend Files Created
```
backend/
├── app.py                 # Main Flask application
├── models.py              # Database models
├── config.py              # Configuration
├── seed_data.py           # Database seeding
├── requirements.txt       # Python dependencies
├── run.bat                # Windows startup script
├── .env                   # Environment variables
├── ecommerce.db           # SQLite database
└── routes/
    ├── __init__.py
    ├── products.py        # Product CRUD endpoints
    ├── auth.py            # Authentication endpoints
    └── orders.py          # Order endpoints
```

### Frontend Files Created/Updated
```
frontend/src/
├── services/
│   └── api.ts             # Backend API integration (NEW)
├── pages/
│   ├── Home.tsx           # Updated to fetch from API
│   └── Checkout.tsx       # Updated to create orders via API
└── context/
    └── AuthContext.tsx    # Updated to use backend auth
```

## Database Schema

### Users Table
- id, name, email, password_hash, role, created_at

### Products Table
- id, name, description, price, stock, image_url, created_at, updated_at

### Orders Table
- id, user_id, total, status, shipping info, created_at

### Order Items Table
- id, order_id, product_id, quantity, price

## Features Implemented

### Products
- [x] List all products
- [x] Get single product
- [x] Create product (auth required)
- [x] Update product (auth required)
- [x] Delete product (auth required)
- [x] Search products

### Authentication
- [x] User registration
- [x] User login
- [x] JWT token generation
- [x] Protected routes
- [x] Get current user

### Orders
- [x] Create order (auth required)
- [x] List user orders (auth required)
- [x] Get single order (auth required)
- [x] Update order status (auth required)
- [x] Cancel order (auth required)
- [x] Automatic stock reduction

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
- Stop other services using port 5000
- Or change port in `app.py`

**Database errors:**
- Delete `ecommerce.db` and run `seed_data.py` again

**Import errors:**
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt`

### Frontend Issues

**API connection errors:**
- Make sure backend is running on port 5000
- Check browser console for CORS errors
- Verify API_URL in `src/services/api.ts`

**TailwindCSS not working:**
- Already fixed! Using TailwindCSS v4 syntax
- Make sure both servers are running

## Next Steps

### Recommended Enhancements
1. Add image upload for products
2. Add order history page
3. Add admin dashboard
4. Add product categories
5. Add user profile page
6. Add payment integration
7. Add email notifications
8. Deploy to production

## Production Deployment

### Backend
- Use PostgreSQL instead of SQLite
- Use Gunicorn as WSGI server
- Set secure JWT secret key
- Enable HTTPS
- Set proper CORS origins

### Frontend
- Build: `npm run build`
- Deploy to Netlify/Vercel
- Update API_URL to production backend

## Support

If you encounter any issues:
1. Check both servers are running
2. Check browser console for errors
3. Check backend terminal for errors
4. Verify database exists and has data
5. Try clearing browser cache and localStorage
