# E-Commerce API Documentation

## Authentication Endpoints

### Register User
- **POST** `/api/auth/register/`
- **Body**: 
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "password_confirm": "securepassword123",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+1234567890"
  }
  ```

### Login
- **POST** `/api/auth/login/`
- **Body**: 
  ```json
  {
    "username": "john_doe",
    "password": "securepassword123"
  }
  ```

### Logout
- **POST** `/api/auth/logout/`
- **Headers**: `Authorization: Token <your_token>`

### User Profile
- **GET/PUT** `/api/auth/profile/`
- **Headers**: `Authorization: Token <your_token>`

### User Addresses
- **GET/POST** `/api/auth/addresses/`
- **GET/PUT/DELETE** `/api/auth/addresses/{id}/`
- **Headers**: `Authorization: Token <your_token>`

## Store Endpoints

### Categories
- **GET/POST** `/api/store/categories/`
- **GET/PUT/DELETE** `/api/store/categories/{id}/`

### Products
- **GET/POST** `/api/store/products/`
- **GET/PUT/DELETE** `/api/store/products/{id}/`
- **Query Parameters**: 
  - `category` - Filter by category ID
  - `search` - Search in name and description
  - `ordering` - Sort by price, created_at, name

### Product Reviews
- **GET/POST** `/api/store/products/{product_id}/reviews/`
- **GET/PUT/DELETE** `/api/store/reviews/{id}/`

### Featured Products
- **GET** `/api/store/featured/`

### Search Products
- **GET** `/api/store/search/?q=<search_term>`

## Cart Endpoints

### Get Cart
- **GET** `/api/cart/`
- **Headers**: `Authorization: Token <your_token>`

### Add to Cart
- **POST** `/api/cart/add/`
- **Headers**: `Authorization: Token <your_token>`
- **Body**: 
  ```json
  {
    "product_id": 1,
    "quantity": 2
  }
  ```

### Update Cart Item
- **PUT** `/api/cart/items/{item_id}/update/`
- **Headers**: `Authorization: Token <your_token>`
- **Body**: 
  ```json
  {
    "quantity": 3
  }
  ```

### Remove from Cart
- **DELETE** `/api/cart/items/{item_id}/remove/`
- **Headers**: `Authorization: Token <your_token>`

### Clear Cart
- **DELETE** `/api/cart/clear/`
- **Headers**: `Authorization: Token <your_token>`

## Order Endpoints

### List Orders
- **GET** `/api/orders/`
- **Headers**: `Authorization: Token <your_token>`

### Order Detail
- **GET** `/api/orders/{id}/`
- **Headers**: `Authorization: Token <your_token>`

### Create Order
- **POST** `/api/orders/create/`
- **Headers**: `Authorization: Token <your_token>`
- **Body**: 
  ```json
  {
    "shipping_address_id": 1,
    "payment_method": "credit_card",
    "notes": "Please deliver in the evening"
  }
  ```

### Cancel Order
- **PUT** `/api/orders/{id}/cancel/`
- **Headers**: `Authorization: Token <your_token>`

### Order History
- **GET** `/api/orders/history/`
- **Headers**: `Authorization: Token <your_token>`

## Admin Panel

Access the Django admin panel at `/admin/` with the superuser credentials:
- Username: admin
- Password: (the one you set during superuser creation)

## Sample Usage Flow

1. **Register a new user** using `/api/auth/register/`
2. **Login** to get authentication token using `/api/auth/login/`
3. **Browse products** using `/api/store/products/`
4. **Add products to cart** using `/api/cart/add/`
5. **Create an address** using `/api/auth/addresses/`
6. **Place an order** using `/api/orders/create/`
7. **View order history** using `/api/orders/history/`

## Database Models

### User Model (CustomUser)
- username, email, phone_number, date_of_birth
- Extends Django's built-in User model

### Address Model
- street_address, city, state, postal_code, country
- Linked to users

### Category Model
- name, description, image

### Product Model
- name, description, price, category, stock_quantity, image
- is_active, created_at, updated_at

### Cart & CartItem Models
- User's shopping cart with items and quantities

### Order, OrderItem & Payment Models
- Complete order management with payment tracking

### Review Model
- Product reviews with ratings and comments
