from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    path('', views.OrderListView.as_view(), name='order-list'),
    path('<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    path('create/', views.create_order, name='create-order'),
    path('<int:order_id>/cancel/', views.cancel_order, name='cancel-order'),
    path('history/', views.order_history, name='order-history'),
]
