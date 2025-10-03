from rest_framework import serializers
from .models import Order, OrderItem, Payment

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.CharField(source='product.price', read_only=True)
    total_price = serializers.ReadOnlyField()
    
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_name', 'product_price', 'quantity', 'price', 'total_price')

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('payment_method', 'transaction_id', 'amount', 'payment_date', 'is_successful')
        read_only_fields = ('payment_date', 'is_successful')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    payment = PaymentSerializer(read_only=True)
    final_total = serializers.ReadOnlyField()
    
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('id', 'user', 'order_number', 'created_at', 'updated_at')

class OrderCreateSerializer(serializers.Serializer):
    shipping_address_id = serializers.IntegerField()
    payment_method = serializers.ChoiceField(choices=Payment.PAYMENT_METHOD_CHOICES)
    notes = serializers.CharField(required=False, allow_blank=True)

class OrderListSerializer(serializers.ModelSerializer):
    final_total = serializers.ReadOnlyField()
    items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = ('id', 'order_number', 'status', 'payment_status', 'final_total', 'items_count', 'created_at')
        
    def get_items_count(self, obj):
        return obj.items.count()
