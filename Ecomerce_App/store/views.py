from rest_framework import generics, permissions, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product, Review
from .serializers import (
    CategorySerializer, 
    ProductSerializer, 
    ProductListSerializer, 
    ReviewSerializer,
    ReviewCreateSerializer
)

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_active=True)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'price']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductListSerializer
        return ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductReviewListView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_id = self.kwargs['product_pk']
        return Review.objects.filter(product_id=product_id)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ReviewCreateSerializer
        return ReviewSerializer

    def perform_create(self, serializer):
        product_id = self.kwargs['product_pk']
        serializer.save(user=self.request.user, product_id=product_id)

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def featured_products(request):
    """Get featured products (top rated or newest)"""
    products = Product.objects.filter(is_active=True)[:8]
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def search_products(request):
    """Search products by name or description"""
    query = request.GET.get('q', '')
    if query:
        products = Product.objects.filter(
            name__icontains=query, 
            is_active=True
        ) | Product.objects.filter(
            description__icontains=query, 
            is_active=True
        )
    else:
        products = Product.objects.filter(is_active=True)
    
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)
