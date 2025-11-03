"""Quick API test script"""
import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_products():
    """Test products endpoint"""
    print("\n=== Testing Products ===")
    response = requests.get(f"{BASE_URL}/products")
    print(f"GET /products: {response.status_code}")
    if response.status_code == 200:
        products = response.json()
        print(f"Found {len(products)} products")
        if products:
            print(f"First product: {products[0]['name']}")
    else:
        print(f"Error: {response.text}")

def test_register():
    """Test registration"""
    print("\n=== Testing Registration ===")
    data = {
        "name": "Test User New",
        "email": f"testuser{__import__('random').randint(1000, 9999)}@example.com",
        "password": "password123"
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=data)
    print(f"POST /auth/register: {response.status_code}")
    if response.status_code == 201:
        result = response.json()
        print(f"User registered: {result['user']['email']}")
        print(f"Token: {result['token'][:20]}...")
        return result['token']
    else:
        print(f"Error: {response.text}")
    return None

def test_login():
    """Test login"""
    print("\n=== Testing Login ===")
    data = {
        "email": "test@example.com",
        "password": "password123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=data)
    print(f"POST /auth/login: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Login successful: {result['user']['email']}")
        print(f"Token: {result['token'][:20]}...")
        return result['token']
    else:
        print(f"Error: {response.text}")
    return None

def test_create_order(token):
    """Test creating an order"""
    print("\n=== Testing Create Order ===")
    data = {
        "items": [
            {"productId": "1", "quantity": 2, "price": 199.99}
        ],
        "total": 399.98,
        "fullName": "Test User",
        "email": "test@example.com",
        "address": "123 Test St",
        "city": "Test City",
        "zipCode": "12345",
        "country": "USA"
    }
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{BASE_URL}/orders", json=data, headers=headers)
    print(f"POST /orders: {response.status_code}")
    if response.status_code == 201:
        result = response.json()
        print(f"Order created: #{result['id']}")
        print(f"Total: ${result['total']}")
    else:
        print(f"Error: {response.text}")

if __name__ == "__main__":
    print("=" * 50)
    print("ShopHub API Test")
    print("=" * 50)
    
    # Test products (no auth required)
    test_products()
    
    # Test registration
    token = test_register()
    
    # Test login
    token = test_login()
    
    # Test creating order (auth required)
    if token:
        test_create_order(token)
    
    print("\n" + "=" * 50)
    print("Test completed!")
    print("=" * 50)
