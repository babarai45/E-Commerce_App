# E-Commerce Django REST API

This is a comprehensive E-commerce application built with Django REST Framework.

## Features

✅ **User Management**
- User registration and authentication
- Custom user model with profile information
- Address management
- Token-based authentication

✅ **Product Catalog**
- Product categories and subcategories
- Product listings with search and filtering
- Product images and detailed descriptions
- Product reviews and ratings
- Inventory management

✅ **Shopping Cart**
- Add/remove items from cart
- Update quantities
- Persistent cart for logged-in users
- Cart total calculations

✅ **Order Management**
- Complete order processing
- Order history and tracking
- Payment integration ready
- Order status management
- Invoice generation

✅ **Admin Panel**
- Django admin interface
- Manage products, categories, orders
- User management
- Content moderation

## Tech Stack

- **Backend**: Django 5.2.7 + Django REST Framework 3.16.1
- **Database**: SQLite (easily switchable to PostgreSQL/MySQL)
- **Authentication**: Token-based authentication
- **Image Handling**: Pillow for image processing
- **Package Management**: UV (modern Python package manager)
- **API Documentation**: Built-in REST framework browsable API

## Installation & Setup

1. **Clone and navigate to project**
   ```bash
   cd E-Commerce_App/Ecomerce_App
   ```

2. **Install dependencies** (UV already installed)
   ```bash
   uv sync
   ```

3. **Run migrations**
   ```bash
   uv run python manage.py migrate
   ```

4. **Create superuser**
   ```bash
   uv run python manage.py createsuperuser
   ```

5. **Populate sample data**
   ```bash
   uv run python manage.py populate_data
   ```

6. **Start development server**
   ```bash
   uv run python manage.py runserver
   ```

## API Endpoints

### Base URL: `http://127.0.0.1:8000/api/`

### Authentication
- `POST /auth/register/` - User registration
- `POST /auth/login/` - User login
- `POST /auth/logout/` - User logout
- `GET/PUT /auth/profile/` - User profile
- `GET/POST /auth/addresses/` - User addresses

### Store
- `GET/POST /store/categories/` - Product categories
- `GET/POST /store/products/` - Products (with search, filter, pagination)
- `GET /store/featured/` - Featured products
- `POST /store/products/{id}/reviews/` - Product reviews

### Cart
- `GET /cart/` - View cart
- `POST /cart/add/` - Add to cart
- `PUT /cart/items/{id}/update/` - Update cart item
- `DELETE /cart/items/{id}/remove/` - Remove from cart

### Orders
- `GET /orders/` - List orders
- `POST /orders/create/` - Create order
- `GET /orders/{id}/` - Order details
- `PUT /orders/{id}/cancel/` - Cancel order

## Project Structure

```
ecommerce_project/
├── ecommerce_project/          # Main project settings
├── users/                      # User management app
├── store/                      # Product catalog app
├── cart/                       # Shopping cart app
├── orders/                     # Order management app
├── media/                      # User uploaded files
├── manage.py                   # Django management script
└── API_Documentation.md        # Detailed API docs
```

## Admin Access

- URL: `http://127.0.0.1:8000/admin/`
- Login with the superuser credentials you created

## Sample Data

The project includes 20+ sample products across 6 categories:
- Electronics (iPhone, MacBook, etc.)
- Clothing (Nike, Adidas, etc.)
- Books (Programming, Literature)
- Home & Garden (Dyson, Instant Pot)
- Sports (Tennis rackets, Water bottles)
- Beauty (Fenty Beauty, The Ordinary)

## API Testing

You can test the API using:

1. **Django REST Framework Browsable API**
   - Visit any endpoint in your browser
   - Interactive forms for testing

2. **cURL Example**
   ```bash
   # Register user
   curl -X POST http://127.0.0.1:8000/api/auth/register/ \
        -H "Content-Type: application/json" \
        -d '{"username":"testuser","email":"test@example.com","password":"testpass123","password_confirm":"testpass123"}'
   
   # Login
   curl -X POST http://127.0.0.1:8000/api/auth/login/ \
        -H "Content-Type: application/json" \
        -d '{"username":"testuser","password":"testpass123"}'
   
   # Get products
   curl -X GET http://127.0.0.1:8000/api/store/products/
   ```

3. **Postman/Insomnia**
   - Import the endpoints from API_Documentation.md
   - Use token authentication for protected endpoints

## Next Steps

🚀 **Ready for Production**
- Switch to PostgreSQL/MySQL for production
- Add Redis for caching and session storage
- Implement proper payment gateway (Stripe, PayPal)
- Add email notifications
- Implement real-time notifications
- Add API rate limiting
- Set up proper logging and monitoring

🎨 **Frontend Integration**
- React/Vue.js frontend
- Mobile app with React Native/Flutter
- Progressive Web App (PWA)

## Development Notes

- All models are properly designed with relationships
- API follows REST conventions
- Proper error handling and validation
- Token-based authentication ready
- Admin interface configured
- Sample data included for testing
- Documentation provided

The application is fully functional and ready for frontend integration or further backend development!
