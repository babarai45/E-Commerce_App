import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storeService, Product, Category, ProductFilters } from '../../services/store';
import { Star, ShoppingCart, Filter, Grid, List } from 'lucide-react';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get('category') ? parseInt(searchParams.get('category')!) : undefined,
    search: searchParams.get('search') || undefined,
    ordering: searchParams.get('ordering') || undefined,
    page: 1,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: storeService.getCategories,
  });

  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => storeService.getProducts(filters),
  });

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (filters.category) newSearchParams.set('category', filters.category.toString());
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.ordering) newSearchParams.set('ordering', filters.ordering);
    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
      viewMode === 'list' ? 'flex' : ''
    }`}>
      <Link to={`/products/${product.id}`} className={viewMode === 'list' ? 'flex-shrink-0' : ''}>
        <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'w-full h-48'}`}>
          <img
            src={product.image || '/api/placeholder/300/200'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {!product.is_in_stock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary-600">${product.price}</span>
          {product.average_rating > 0 && renderStars(product.average_rating)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{product.category.name}</span>
          <button
            disabled={!product.is_in_stock}
            className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.is_in_stock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h3>
            
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange({ 
                  category: e.target.value ? parseInt(e.target.value) : undefined 
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories?.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.ordering || ''}
                onChange={(e) => handleFilterChange({ ordering: e.target.value || undefined })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Default</option>
                <option value="name">Name (A-Z)</option>
                <option value="-name">Name (Z-A)</option>
                <option value="price">Price (Low to High)</option>
                <option value="-price">Price (High to Low)</option>
                <option value="-created_at">Newest First</option>
                <option value="created_at">Oldest First</option>
              </select>
            </div>

            {/* Search Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={filters.search || ''}
                onChange={(e) => handleFilterChange({ search: e.target.value || undefined })}
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Products Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              {productsData && (
                <p className="text-gray-600">
                  {productsData.count} product{productsData.count !== 1 ? 's' : ''} found
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${
                  viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
                } hover:bg-primary-700 hover:text-white transition-colors`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
                } hover:bg-primary-700 hover:text-white transition-colors`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Products Grid/List */}
          {isLoading ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`bg-white rounded-lg shadow-md overflow-hidden animate-pulse ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`bg-gray-300 ${
                    viewMode === 'list' ? 'w-48 h-48' : 'w-full h-48'
                  }`}></div>
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading products. Please try again.</p>
            </div>
          ) : !productsData?.results?.length ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {productsData.results.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {productsData && (productsData.next || productsData.previous) && (
            <div className="flex justify-center mt-8 space-x-4">
              {productsData.previous && (
                <button
                  onClick={() => handleFilterChange({ page: (filters.page || 1) - 1 })}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}
              {productsData.next && (
                <button
                  onClick={() => handleFilterChange({ page: (filters.page || 1) + 1 })}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
