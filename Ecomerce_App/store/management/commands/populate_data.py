from django.core.management.base import BaseCommand
from store.models import Category, Product
from users.models import CustomUser
from decimal import Decimal

class Command(BaseCommand):
    help = 'Populate the database with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')

        # Create categories
        categories_data = [
            {'name': 'Electronics', 'description': 'Electronic devices and gadgets'},
            {'name': 'Clothing', 'description': 'Fashion and apparel'},
            {'name': 'Books', 'description': 'Books and literature'},
            {'name': 'Home & Garden', 'description': 'Home improvement and gardening'},
            {'name': 'Sports', 'description': 'Sports equipment and gear'},
            {'name': 'Beauty', 'description': 'Beauty and personal care products'},
        ]

        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(f'Created category: {category.name}')

        # Create products
        products_data = [
            # Electronics
            {'name': 'iPhone 15 Pro', 'description': 'Latest Apple smartphone with advanced features', 'price': Decimal('999.99'), 'category': 'Electronics', 'stock_quantity': 50},
            {'name': 'Samsung Galaxy S24', 'description': 'Premium Android smartphone', 'price': Decimal('899.99'), 'category': 'Electronics', 'stock_quantity': 45},
            {'name': 'MacBook Air M3', 'description': 'Lightweight laptop with M3 chip', 'price': Decimal('1199.99'), 'category': 'Electronics', 'stock_quantity': 30},
            {'name': 'Sony WH-1000XM5', 'description': 'Noise-canceling wireless headphones', 'price': Decimal('399.99'), 'category': 'Electronics', 'stock_quantity': 100},
            {'name': 'iPad Pro 12.9"', 'description': 'Professional tablet with M2 chip', 'price': Decimal('1099.99'), 'category': 'Electronics', 'stock_quantity': 25},

            # Clothing
            {'name': 'Levi\'s 501 Original Jeans', 'description': 'Classic straight-leg jeans', 'price': Decimal('79.99'), 'category': 'Clothing', 'stock_quantity': 200},
            {'name': 'Nike Air Max 270', 'description': 'Comfortable running shoes', 'price': Decimal('149.99'), 'category': 'Clothing', 'stock_quantity': 150},
            {'name': 'Adidas Ultraboost 22', 'description': 'Premium running shoes', 'price': Decimal('179.99'), 'category': 'Clothing', 'stock_quantity': 120},
            {'name': 'Supreme Box Logo Hoodie', 'description': 'Streetwear hoodie', 'price': Decimal('250.00'), 'category': 'Clothing', 'stock_quantity': 75},

            # Books
            {'name': 'The Great Gatsby', 'description': 'Classic American literature', 'price': Decimal('12.99'), 'category': 'Books', 'stock_quantity': 300},
            {'name': 'Clean Code', 'description': 'A handbook of agile software craftsmanship', 'price': Decimal('45.99'), 'category': 'Books', 'stock_quantity': 150},
            {'name': 'The Alchemist', 'description': 'International bestseller novel', 'price': Decimal('14.99'), 'category': 'Books', 'stock_quantity': 200},

            # Home & Garden
            {'name': 'Dyson V15 Detect', 'description': 'Cordless vacuum cleaner', 'price': Decimal('749.99'), 'category': 'Home & Garden', 'stock_quantity': 40},
            {'name': 'Instant Pot Duo 7-in-1', 'description': 'Multi-use pressure cooker', 'price': Decimal('99.99'), 'category': 'Home & Garden', 'stock_quantity': 80},
            {'name': 'Philips Hue Smart Bulbs', 'description': 'Color-changing LED smart bulbs', 'price': Decimal('199.99'), 'category': 'Home & Garden', 'stock_quantity': 60},

            # Sports
            {'name': 'Wilson Pro Staff Tennis Racket', 'description': 'Professional tennis racket', 'price': Decimal('199.99'), 'category': 'Sports', 'stock_quantity': 50},
            {'name': 'Nike Dri-FIT Running Shirt', 'description': 'Moisture-wicking athletic shirt', 'price': Decimal('29.99'), 'category': 'Sports', 'stock_quantity': 200},
            {'name': 'Yeti Rambler Water Bottle', 'description': 'Insulated stainless steel bottle', 'price': Decimal('39.99'), 'category': 'Sports', 'stock_quantity': 150},

            # Beauty
            {'name': 'Fenty Beauty Foundation', 'description': 'Long-wearing liquid foundation', 'price': Decimal('39.00'), 'category': 'Beauty', 'stock_quantity': 100},
            {'name': 'The Ordinary Retinol Serum', 'description': 'Anti-aging skincare serum', 'price': Decimal('16.90'), 'category': 'Beauty', 'stock_quantity': 200},
        ]

        for product_data in products_data:
            category = categories[product_data['category']]
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults={
                    'description': product_data['description'],
                    'price': product_data['price'],
                    'category': category,
                    'stock_quantity': product_data['stock_quantity'],
                    'is_active': True
                }
            )
            if created:
                self.stdout.write(f'Created product: {product.name}')

        self.stdout.write(self.style.SUCCESS('Successfully populated database with sample data!'))
