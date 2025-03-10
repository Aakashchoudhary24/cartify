import os
import django
import random
from decimal import Decimal
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Category, Brand, Product, Profile, Cart, CartItem, Order, OrderItem

# Ensure Django is set up
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()

class Command(BaseCommand):
    help = 'Seed the database with dummy data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')
        self.create_categories()
        self.create_brands()
        self.create_products()
        self.create_user_and_profile()
        self.create_cart()
        self.create_orders()
        self.stdout.write('Database seeded successfully.')

    def create_categories(self):
        categories = [
            {'name': 'Men', 'description': 'Men clothing'},
            {'name': 'Women', 'description': 'Women clothing'},
        ]
        for category in categories:
            Category.objects.create(**category)

    def create_brands(self):
        brands = ['Ralph Lauren', 'Gucci', 'Prada', 'Versace', 'Armani']
        for brand in brands:
            Brand.objects.create(name=brand)

    def create_products(self):
        categories = Category.objects.all()
        brands = Brand.objects.all()
        product_names = [
            'Polo T-Shirt', 'Top Grain Leather Shirt', 'Silk Blouse', 'Cashmere Sweater', 'Designer Jeans',
            'Luxury Hoodie', 'Formal Suit', 'Evening Gown', 'Cocktail Dress', 'Sports Jacket',
            'Leather Jacket', 'Denim Jacket', 'Wool Coat', 'Trench Coat', 'Bomber Jacket',
            'Chinos', 'Dress Pants', 'Cargo Pants', 'Shorts', 'Skirt',
            'Mini Skirt', 'Maxi Dress', 'Midi Dress', 'Tunic', 'Kaftan',
            'Cardigan', 'Pullover', 'Tank Top', 'Camisole', 'Bodysuit',
            'Jumpsuit', 'Romper', 'Tracksuit', 'Sweatpants', 'Leggings',
            'Yoga Pants', 'Athletic Shorts', 'Swim Trunks', 'Bikini', 'One-Piece Swimsuit',
            'Pajamas', 'Nightgown', 'Robe', 'Lingerie', 'Underwear',
            'Socks', 'Tights', 'Stockings', 'Gloves', 'Scarf'
        ]
        products = [
            {
                'name': product_names[i],
                'description': f'High-quality {product_names[i]}',
                'price': round(random.uniform(5000.0, 50000.0), 2),  
                'gender': random.choice(['M', 'F', 'U']),
                'category': random.choice(categories),
                'image1': 'https://via.placeholder.com/150',
                'image2': 'https://via.placeholder.com/150',
                'image3': 'https://via.placeholder.com/150',
                'brand': random.choice(brands),
                'colour': random.choice(['Black', 'White', 'Red', 'Blue', 'Green'])
            }
            for i in range(50)
        ]
        for product in products:
            Product.objects.create(**product)

    def create_user_and_profile(self):
        user_data = {'username': 'john_doe', 'email': 'john@example.com', 'password': 'password123'}
        user = User.objects.create_user(**user_data)
        Profile.objects.create(
            user=user,
            address='123 Main St',
            first_name='John',
            last_name='Doe',
            phone_number='1234567890'
        )

    def create_cart(self):
        user = User.objects.get(username='john_doe')
        products = Product.objects.all()
        cart = Cart.objects.create(user=user)
        for _ in range(2):  # Add 2 random products to the cart
            CartItem.objects.create(
                cart=cart,
                product=random.choice(products),
                quantity=random.randint(1, 5)
            )

    def create_orders(self):
        profile = Profile.objects.get(user__username='john_doe')
        products = Product.objects.all()
        for _ in range(5):  # Create 5 orders
            order = Order.objects.create(
                user=profile,
                total_price=round(random.uniform(5000.0, 50000.0), 2),  # Prices in INR
                status='Pending'
            )
            for _ in range(2):  # Add 2 random products to each order
                OrderItem.objects.create(
                    order=order,
                    product=random.choice(products),
                    quantity=random.randint(1, 5),
                    price=round(random.uniform(5000.0, 50000.0), 2)  # Prices in INR
                )