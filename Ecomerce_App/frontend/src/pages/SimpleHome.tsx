import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storeService, Product, Category } from '../services/store';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const SimpleHome: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const { data: featuredProducts, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['featured-products'],
    queryFn: storeService.getFeaturedProducts,
  });

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: storeService.getCategories,
  });

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    setAddingToCart(productId);
    try {
      await addToCart({ product_id: productId, quantity: 1 });
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'toast toast-success';
      toast.textContent = 'Product added to cart!';
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      alert(error.message || 'Failed to add item to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to ShopMart</h1>
          <p>Discover amazing products at unbeatable prices with fast delivery and exceptional service</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              🛍️ Shop Now
            </Link>
            <Link to="/categories" className="btn btn-outline btn-lg">
              🔍 Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Explore our wide range of carefully curated product categories</p>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="loading-skeleton" style={{ height: '200px', borderRadius: '1rem' }}></div>
              ))}
            </div>
          ) : categoriesError ? (
            <div className="alert alert-error">
              <span>⚠️</span>
              Error loading categories: {categoriesError.message}
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {categories && Array.isArray(categories) ? categories.slice(0, 6).map((category: Category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="category-card"
                >
                  <div className="category-icon">
                    {category.name.charAt(0)}
                  </div>
                  <h3 className="category-name">{category.name}</h3>
                </Link>
              )) : (
                <div style={{ textAlign: 'center', color: 'var(--gray-500)', gridColumn: 'span 3' }}>
                  <p>No categories available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Featured Products</h2>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.125rem' }}>Handpicked products just for you</p>
            </div>
            <Link to="/products" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600', fontSize: '1.125rem' }}>
              View All →
            </Link>
          </div>
          
          {productsLoading ? (
            <div className="grid grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="product-card">
                  <div className="loading-skeleton" style={{ height: '250px' }}></div>
                  <div style={{ padding: '1.5rem' }}>
                    <div className="loading-skeleton" style={{ height: '1.5rem', marginBottom: '0.5rem', borderRadius: '0.25rem' }}></div>
                    <div className="loading-skeleton" style={{ height: '1rem', width: '60%', borderRadius: '0.25rem' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : productsError ? (
            <div className="alert alert-error">
              <span>⚠️</span>
              Error loading products: {productsError.message}
            </div>
          ) : (
            <div className="grid grid-cols-4">
              {featuredProducts && Array.isArray(featuredProducts) ? featuredProducts.slice(0, 8).map((product: Product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image || `https://via.placeholder.com/300x250/f1f5f9/64748b?text=${encodeURIComponent(product.name)}`}
                      alt={product.name}
                      className="product-image"
                    />
                  </Link>
                  <div className="product-info">
                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                      <h3 className="product-title">{product.name}</h3>
                    </Link>
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < Math.floor(product.average_rating) ? '#fbbf24' : '#e5e7eb' }}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span>({product.average_rating.toFixed(1)})</span>
                    </div>
                    <div className="product-price">${product.price}</div>
                    <button 
                      className={`btn ${product.is_in_stock ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ width: '100%' }}
                      disabled={!product.is_in_stock || addingToCart === product.id}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      {addingToCart === product.id ? (
                        <span className="spinner-sm" style={{ margin: '0' }}></span>
                      ) : product.is_in_stock ? (
                        '🛒 Add to Cart'
                      ) : (
                        '📋 Out of Stock'
                      )}
                    </button>
                  </div>
                </div>
              )) : (
                <div style={{ textAlign: 'center', color: 'var(--gray-500)', gridColumn: 'span 4' }}>
                  <p>No featured products available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SimpleHome;
