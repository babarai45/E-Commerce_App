from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction
import uuid
from .models import Order, OrderItem, Payment
from cart.models import Cart
from users.models import Address
from .serializers import (
    OrderSerializer, 
    OrderCreateSerializer, 
    OrderListSerializer,
    PaymentSerializer
)

class OrderListView(generics.ListAPIView):
    serializer_class = OrderListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_order(request):
    serializer = OrderCreateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    user = request.user
    cart = get_object_or_404(Cart, user=user)
    
    if not cart.items.exists():
        return Response({
            'error': 'Cart is empty'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    shipping_address_id = serializer.validated_data['shipping_address_id']
    payment_method = serializer.validated_data['payment_method']
    notes = serializer.validated_data.get('notes', '')
    
    shipping_address = get_object_or_404(Address, id=shipping_address_id, user=user)
    
    # Calculate totals
    total_amount = cart.total_price
    shipping_cost = 10.00  # Fixed shipping cost for demo
    tax_amount = total_amount * 0.08  # 8% tax
    
    try:
        with transaction.atomic():
            # Create order
            order = Order.objects.create(
                user=user,
                order_number=f"ORD-{uuid.uuid4().hex[:8].upper()}",
                shipping_address=shipping_address,
                total_amount=total_amount,
                shipping_cost=shipping_cost,
                tax_amount=tax_amount,
                notes=notes
            )
            
            # Create order items
            for cart_item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    quantity=cart_item.quantity,
                    price=cart_item.product.price
                )
                
                # Update product stock
                product = cart_item.product
                product.stock_quantity -= cart_item.quantity
                product.save()
            
            # Create payment record
            Payment.objects.create(
                order=order,
                payment_method=payment_method,
                amount=order.final_total,
                is_successful=True  # For demo purposes
            )
            
            # Update order status
            order.status = 'confirmed'
            order.payment_status = 'paid'
            order.save()
            
            # Clear cart
            cart.items.all().delete()
            
            return Response({
                'message': 'Order created successfully',
                'order': OrderSerializer(order).data
            }, status=status.HTTP_201_CREATED)
            
    except Exception as e:
        return Response({
            'error': f'Order creation failed: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def cancel_order(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    
    if order.status in ['shipped', 'delivered']:
        return Response({
            'error': 'Cannot cancel order that has been shipped or delivered'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    order.status = 'cancelled'
    order.save()
    
    # Restore product stock
    for item in order.items.all():
        product = item.product
        product.stock_quantity += item.quantity
        product.save()
    
    return Response({
        'message': 'Order cancelled successfully',
        'order': OrderSerializer(order).data
    })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def order_history(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderListSerializer(orders, many=True)
    return Response(serializer.data)
