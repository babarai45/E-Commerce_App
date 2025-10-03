#!/usr/bin/env python
"""
Automated testing script for E-commerce application
"""
import requests
import json
import time

BASE_URL = "http://127.0.0.1:8000/api"

def test_api_endpoints():
    """Test various API endpoints"""
    print("🧪 Testing E-commerce API endpoints...")
    
    # Test categories endpoint
    print("\n1. Testing Categories API...")
    try:
        response = requests.get(f"{BASE_URL}/store/categories/")
        if response.status_code == 200:
            categories = response.json()
            print(f"✅ Categories API working! Found {len(categories)} categories")
            if categories:
                print(f"   First category: {categories[0]['name']}")
        else:
            print(f"❌ Categories API failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Categories API error: {e}")
    
    # Test featured products endpoint
    print("\n2. Testing Featured Products API...")
    try:
        response = requests.get(f"{BASE_URL}/store/featured/")
        if response.status_code == 200:
            products = response.json()
            print(f"✅ Featured Products API working! Found {len(products)} products")
            if products:
                print(f"   First product: {products[0]['name']} - ${products[0]['price']}")
        else:
            print(f"❌ Featured Products API failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Featured Products API error: {e}")
    
    # Test all products endpoint
    print("\n3. Testing All Products API...")
    try:
        response = requests.get(f"{BASE_URL}/store/products/")
        if response.status_code == 200:
            products_data = response.json()
            products = products_data.get('results', [])
            print(f"✅ Products API working! Found {len(products)} products")
            if products:
                print(f"   First product: {products[0]['name']}")
        else:
            print(f"❌ Products API failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Products API error: {e}")
    
    # Test registration
    print("\n4. Testing User Registration...")
    test_user = {
        "username": f"testuser_{int(time.time())}",
        "email": f"test_{int(time.time())}@example.com",
        "password": "testpass123",
        "password_confirm": "testpass123",
        "first_name": "Test",
        "last_name": "User"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register/", json=test_user)
        if response.status_code == 201:
            print("✅ User registration working!")
            user_data = response.json()
            token = user_data.get('token')
            print(f"   User created: {user_data['user']['username']}")
            
            # Test authentication with the new user
            print("\n5. Testing Authentication...")
            login_data = {
                "username": test_user["username"],
                "password": test_user["password"]
            }
            
            login_response = requests.post(f"{BASE_URL}/auth/login/", json=login_data)
            if login_response.status_code == 200:
                print("✅ Login working!")
                login_result = login_response.json()
                auth_token = login_result.get('token')
                
                # Test cart functionality
                print("\n6. Testing Cart API...")
                headers = {"Authorization": f"Token {auth_token}"}
                
                cart_response = requests.get(f"{BASE_URL}/cart/", headers=headers)
                if cart_response.status_code == 200:
                    print("✅ Cart API working!")
                    cart_data = cart_response.json()
                    print(f"   Cart items: {cart_data.get('total_items', 0)}")
                else:
                    print(f"❌ Cart API failed with status {cart_response.status_code}")
                    
            else:
                print(f"❌ Login failed with status {login_response.status_code}")
                
        else:
            print(f"❌ Registration failed with status {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Registration/Login error: {e}")

def test_frontend():
    """Test frontend is accessible"""
    print("\n\n🌐 Testing Frontend...")
    try:
        response = requests.get("http://localhost:3000")
        if response.status_code == 200:
            print("✅ Frontend is accessible!")
            print(f"   Content length: {len(response.content)} bytes")
        else:
            print(f"❌ Frontend failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Frontend error: {e}")

if __name__ == "__main__":
    print("🚀 Starting E-commerce App Testing...")
    print("=" * 50)
    
    test_api_endpoints()
    test_frontend()
    
    print("\n" + "=" * 50)
    print("🎉 Testing completed!")
    print("\n📋 Manual Testing Checklist:")
    print("   1. Visit http://localhost:3000 in browser")
    print("   2. Try registering a new user")
    print("   3. Try logging in")
    print("   4. Try adding products to cart")
    print("   5. Check cart functionality")
    print("   6. Test responsive design on mobile")
