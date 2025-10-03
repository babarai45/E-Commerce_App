from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """
    E-Commerce API Root
    
    Welcome to the E-Commerce REST API!
    
    Available endpoints:
    """
    return Response({
        'message': 'Welcome to E-Commerce REST API',
        'version': '1.0.0',
        'endpoints': {
            'authentication': {
                'register': '/api/auth/register/',
                'login': '/api/auth/login/',
                'logout': '/api/auth/logout/',
                'profile': '/api/auth/profile/',
                'addresses': '/api/auth/addresses/',
            },
            'store': {
                'categories': '/api/store/categories/',
                'products': '/api/store/products/',
                'featured_products': '/api/store/featured/',
                'search': '/api/store/search/',
            },
            'cart': {
                'cart': '/api/cart/',
                'add_to_cart': '/api/cart/add/',
                'clear_cart': '/api/cart/clear/',
            },
            'orders': {
                'orders': '/api/orders/',
                'create_order': '/api/orders/create/',
                'order_history': '/api/orders/history/',
            }
        },
        'admin': '/admin/',
        'documentation': 'See API_Documentation.md for detailed usage'
    })
