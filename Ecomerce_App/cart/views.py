from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from store.models import Product
from .serializers import (
    CartSerializer, 
    CartItemSerializer, 
    AddToCartSerializer, 
    UpdateCartItemSerializer
)

class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_to_cart(request):
    serializer = AddToCartSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    product_id = serializer.validated_data['product_id']
    quantity = serializer.validated_data['quantity']
    
    product = get_object_or_404(Product, id=product_id, is_active=True)
    
    if product.stock_quantity < quantity:
        return Response({
            'error': 'Insufficient stock'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart, 
        product=product,
        defaults={'quantity': quantity}
    )
    
    if not created:
        cart_item.quantity += quantity
        if cart_item.quantity > product.stock_quantity:
            return Response({
                'error': 'Insufficient stock'
            }, status=status.HTTP_400_BAD_REQUEST)
        cart_item.save()
    
    return Response({
        'message': 'Product added to cart successfully',
        'cart_item': CartItemSerializer(cart_item).data
    }, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_cart_item(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    serializer = UpdateCartItemSerializer(cart_item, data=request.data)
    serializer.is_valid(raise_exception=True)
    
    quantity = serializer.validated_data['quantity']
    
    if cart_item.product.stock_quantity < quantity:
        return Response({
            'error': 'Insufficient stock'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    serializer.save()
    return Response({
        'message': 'Cart item updated successfully',
        'cart_item': CartItemSerializer(cart_item).data
    })

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def remove_from_cart(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    cart_item.delete()
    return Response({
        'message': 'Item removed from cart successfully'
    }, status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def clear_cart(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart.items.all().delete()
    return Response({
        'message': 'Cart cleared successfully'
    }, status=status.HTTP_204_NO_CONTENT)
