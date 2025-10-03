from django.contrib import admin
from .models import Order, OrderItem, Payment

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('total_price',)

class PaymentInline(admin.StackedInline):
    model = Payment
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'status', 'payment_status', 'final_total', 'created_at')
    list_filter = ('status', 'payment_status', 'created_at')
    search_fields = ('order_number', 'user__username')
    ordering = ('-created_at',)
    readonly_fields = ('order_number', 'final_total')
    inlines = [OrderItemInline, PaymentInline]

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price', 'total_price')
    search_fields = ('order__order_number', 'product__name')
    ordering = ('-created_at',)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'payment_method', 'amount', 'is_successful', 'payment_date')
    list_filter = ('payment_method', 'is_successful', 'payment_date')
    search_fields = ('order__order_number', 'transaction_id')
    ordering = ('-payment_date',)
