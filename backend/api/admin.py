from django.contrib import admin
from .models import Category, Product, Cart, CartItem, Order, OrderItem, Payment, About

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)
admin.site.register(About)