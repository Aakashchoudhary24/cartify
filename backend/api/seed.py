import os
import django
import random
from decimal import Decimal
from django.contrib.auth.models import User
from api.models import Category, Product, Cart, CartItem, Order, OrderItem, Payment

# Ensure Django is set up
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()

def create_users():
    print("Creating users...")
    users = []
    for i in range(1, 6):
        user, created = User.objects.get_or_create(username=f"user{i}", email=f"user{i}@example.com")
        user.set_password("password123")
        user.save()
        users.append(user)
    return users

def create_categories():
    print("Creating categories...")
    category_names = [
        "Men's Clothing", "Women's Clothing", "Kids' Clothing", 
        "Footwear", "Accessories", "Winter Wear"
    ]
    
    categories = []
    for name in category_names:
        category, created = Category.objects.get_or_create(name=name, description=f"Trendy {name.lower()} for all seasons.")
        categories.append(category)
    
    return categories

def create_products(categories):
    print("Creating products...")
    product_data = {
        "Men's Clothing": [
            ("Slim Fit Jeans", "Classic denim jeans for everyday wear.", 49.99, 100),
            ("Cotton T-Shirt", "Breathable cotton t-shirt in various colors.", 19.99, 150),
            ("Formal Shirt", "Stylish formal shirt for office wear.", 39.99, 80),
            ("Leather Jacket", "Premium leather jacket for a bold look.", 99.99, 50),
        ],
        "Women's Clothing": [
            ("Maxi Dress", "Elegant maxi dress for evening occasions.", 69.99, 70),
            ("High-Waisted Jeans", "Trendy high-waisted jeans with stretch fabric.", 59.99, 90),
            ("Crop Top", "Chic crop top for a casual day out.", 25.99, 120),
            ("Winter Sweater", "Soft wool sweater for chilly days.", 45.99, 60),
        ],
        "Kids' Clothing": [
            ("Graphic Hoodie", "Cute graphic hoodie for kids.", 29.99, 100),
            ("Printed T-Shirt", "Colorful printed t-shirt for kids.", 14.99, 150),
            ("Denim Shorts", "Durable denim shorts for playtime.", 24.99, 80),
        ],
        "Footwear": [
            ("Sneakers", "Comfortable sneakers for daily use.", 59.99, 100),
            ("Running Shoes", "Lightweight running shoes with great grip.", 69.99, 80),
            ("Leather Boots", "Premium leather boots for all occasions.", 89.99, 40),
            ("Slippers", "Soft slippers for indoor comfort.", 15.99, 120),
        ],
        "Accessories": [
            ("Leather Wallet", "Genuine leather wallet with multiple compartments.", 29.99, 50),
            ("Sunglasses", "UV-protected stylish sunglasses.", 19.99, 80),
            ("Wristwatch", "Classic analog wristwatch for a sophisticated look.", 79.99, 40),
            ("Handbag", "Trendy handbag with spacious compartments.", 49.99, 60),
        ],
        "Winter Wear": [
            ("Puffer Jacket", "Insulated puffer jacket for extreme cold.", 119.99, 30),
            ("Thermal Gloves", "Woolen gloves for extra warmth.", 19.99, 100),
            ("Wool Scarf", "Soft wool scarf for winter fashion.", 25.99, 80),
        ]
    }

    products = []
    for category, items in product_data.items():
        for name, description, price, stock in items:
            product, created = Product.objects.get_or_create(
                name=name,
                description=description,
                price=Decimal(price),
                stock=stock,
                category=Category.objects.get(name=category)
            )
            products.append(product)
    
    return products

def create_carts(users, products):
    print("Creating carts...")
    for user in users:
        cart, created = Cart.objects.get_or_create(user=user)
        selected_products = random.sample(products, random.randint(1, 4))
        for product in selected_products:
            CartItem.objects.create(cart=cart, product=product, quantity=random.randint(1, 3))

def create_orders(users, products):
    print("Creating orders...")
    orders = []
    for user in users:
        order = Order.objects.create(
            user=user,
            total_price=Decimal(sum(p.price for p in random.sample(products, random.randint(1, 3)))),
            status=random.choice(["Pending", "Shipped", "Delivered"])
        )

        selected_products = random.sample(products, random.randint(1, 3))
        for product in selected_products:
            OrderItem.objects.create(order=order, product=product, quantity=random.randint(1, 3), price=product.price)

        orders.append(order)
    
    return orders

def create_payments(orders):
    print("Creating payments...")
    payment_methods = ["Credit Card", "PayPal", "UPI", "Cash on Delivery"]
    for order in orders:
        Payment.objects.create(
            order=order,
            method=random.choice(payment_methods),
            amount=order.total_price,
            status=random.choice(["Pending", "Completed"]),
            transaction_id=f"TXN{random.randint(100000, 999999)}"
        )

# Running the seed functions
users = create_users()
categories = create_categories()
products = create_products(categories)
create_carts(users, products)
orders = create_orders(users, products)
create_payments(orders)

print("Clothing database seeding completed successfully! 🛍️")