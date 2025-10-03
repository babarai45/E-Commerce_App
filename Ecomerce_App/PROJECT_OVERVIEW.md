# 🛍️ Full Stack E-Commerce Application

A complete e-commerce solution with Django REST Framework backend and React TypeScript frontend.

## 📁 Project Structure

```
E-Commerce_App/
├── backend/                          # Django REST API
│   ├── ecommerce_project/           # Main Django project
│   │   ├── settings.py              # Django settings with CORS, DRF config
│   │   ├── urls.py                  # Main URL routing
│   │   └── views.py                 # API root view
│   ├── users/                       # User management app
│   │   ├── models.py                # CustomUser, Address models
│   │   ├── serializers.py           # User serializers
│   │   ├── views.py                 # Auth views (login, register, profile)
│   │   └── urls.py                  # User-related URLs
│   ├── store/                       # Product catalog app
│   │   ├── models.py                # Category, Product, Review models
│   │   ├── serializers.py           # Product serializers
│   │   ├── views.py                 # Product CRUD, search, featured
│   │   └── urls.py                  # Store URLs
│   ├── cart/                        # Shopping cart app
│   │   ├── models.py                # Cart, CartItem models
│   │   ├── serializers.py           # Cart serializers
│   │   ├── views.py                 # Cart management views
│   │   └── urls.py                  # Cart URLs
│   ├── orders/                      # Order management app
│   │   ├── models.py                # Order, OrderItem, Payment models
│   │   ├── serializers.py           # Order serializers
│   │   ├── views.py                 # Order processing views
│   │   └── urls.py                  # Order URLs
│   ├── manage.py                    # Django management script
│   ├── db.sqlite3                   # SQLite database
│   └── media/                       # User uploaded files
│
├── frontend/                        # React TypeScript frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   └── layout/             # Header, Footer, Layout
│   │   ├── contexts/               # React contexts
│   │   │   └── AuthContext.tsx     # Authentication state
│   │   ├── pages/                  # Page components
│   │   │   ├── auth/              # Login, Register pages
│   │   │   ├── products/          # Product listing, detail
│   │   │   └── Home.tsx           # Landing page
│   │   ├── services/              # API service layer
│   │   │   ├── api.ts             # Axios config & interceptors
│   │   │   ├── auth.ts            # Authentication services
│   │   │   ├── store.ts           # Product services
│   │   │   ├── cart.ts            # Cart services
│   │   │   └── orders.ts          # Order services
│   │   ├── App.tsx                # Main app with routing
│   │   └── index.tsx              # Entry point
│   ├── package.json               # Dependencies & scripts
│   └── tailwind.config.js         # Tailwind CSS config
│
├── API_Documentation.md            # Complete API documentation
└── README.md                       # Project overview
```

## 🚀 Quick Start

### Backend (Django)
```bash
# Install dependencies
uv sync

# Run migrations
uv run python manage.py migrate

# Create superuser
uv run python manage.py createsuperuser

# Populate sample data
uv run python manage.py populate_data

# Start Django server
uv run python manage.py runserver
```

### Frontend (React)
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000/api/
- **Admin Panel**: http://127.0.0.1:8000/admin/

## ✨ Key Features

### Backend (Django REST Framework)
- ✅ User authentication with custom user model
- ✅ Product catalog with categories and reviews
- ✅ Shopping cart functionality
- ✅ Order processing and management
- ✅ RESTful API with filtering, search, and pagination
- ✅ Admin interface for content management
- ✅ Token-based authentication
- ✅ CORS enabled for frontend integration

### Frontend (React + TypeScript)
- ✅ Modern responsive UI with Tailwind CSS
- ✅ User authentication (login/register)
- ✅ Product browsing with search and filters
- ✅ Shopping cart management
- ✅ Order placement workflow
- ✅ React Query for efficient data fetching
- ✅ TypeScript for type safety
- ✅ Mobile-first responsive design

## 🛠️ Technology Stack

### Backend
- **Framework**: Django 5.2.7
- **API**: Django REST Framework 3.16.1
- **Database**: SQLite (easily configurable to PostgreSQL/MySQL)
- **Authentication**: Token-based authentication
- **Filtering**: django-filter
- **Images**: Pillow for image handling
- **CORS**: django-cors-headers

### Frontend
- **Framework**: React 19.2.0 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📊 Database Schema

### Core Models
- **CustomUser**: Extended user model with profile fields
- **Address**: User shipping addresses
- **Category**: Product categories
- **Product**: Products with pricing, stock, images
- **Review**: Product reviews and ratings
- **Cart/CartItem**: Shopping cart functionality
- **Order/OrderItem**: Order processing
- **Payment**: Payment tracking

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET/PUT /api/auth/profile/` - User profile
- `GET/POST /api/auth/addresses/` - User addresses

### Store
- `GET /api/store/categories/` - Product categories
- `GET /api/store/products/` - Products with filtering
- `GET /api/store/products/{id}/` - Product details
- `GET /api/store/featured/` - Featured products
- `POST /api/store/products/{id}/reviews/` - Add review

### Cart
- `GET /api/cart/` - View cart
- `POST /api/cart/add/` - Add to cart
- `PUT /api/cart/items/{id}/update/` - Update quantity
- `DELETE /api/cart/items/{id}/remove/` - Remove item

### Orders
- `GET /api/orders/` - List orders
- `POST /api/orders/create/` - Create order
- `GET /api/orders/{id}/` - Order details
- `PUT /api/orders/{id}/cancel/` - Cancel order

## 📱 Sample Data

The application comes with pre-populated sample data:
- **6 Categories**: Electronics, Clothing, Books, Home & Garden, Sports, Beauty
- **20+ Products**: Diverse product catalog with pricing and descriptions
- **Admin User**: Access to Django admin panel
- **Sample Images**: Placeholder images for products

## 🚀 Production Deployment

### Backend Deployment
- Configure PostgreSQL/MySQL database
- Set environment variables for secrets
- Configure static file serving
- Set up media file storage (AWS S3, etc.)
- Configure email backend
- Enable SSL/HTTPS

### Frontend Deployment
- Build production bundle: `npm run build`
- Deploy to CDN (Netlify, Vercel, etc.)
- Configure environment variables
- Set up CI/CD pipeline

## 🔧 Development Features

- **Hot Reload**: Both Django and React support hot reload
- **API Documentation**: Built-in REST framework browsable API
- **Error Handling**: Comprehensive error handling on both ends
- **Type Safety**: TypeScript ensures type safety in frontend
- **Code Organization**: Clean separation of concerns
- **Responsive Design**: Mobile-first approach

## 📈 Future Enhancements

### Immediate
- [ ] Product search autocomplete
- [ ] User wishlist functionality
- [ ] Advanced filtering (price range, ratings)
- [ ] Product comparison feature
- [ ] Email notifications

### Advanced
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Real-time inventory tracking
- [ ] Multi-vendor marketplace
- [ ] Social authentication
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support

This is a production-ready e-commerce application with modern architecture and best practices!
