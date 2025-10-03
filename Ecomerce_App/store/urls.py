from django.urls import path
from . import views

app_name = 'store'

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('products/<int:product_pk>/reviews/', views.ProductReviewListView.as_view(), name='product-reviews'),
    path('reviews/<int:pk>/', views.ReviewDetailView.as_view(), name='review-detail'),
    path('featured/', views.featured_products, name='featured-products'),
    path('search/', views.search_products, name='search-products'),
]
