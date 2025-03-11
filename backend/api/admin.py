from django.contrib import admin
from .models import Category, Product, Cart, CartItem, Order, OrderItem, Payment
from django.contrib.admin.sites import AdminSite
from django.utils.html import format_html


class CustomAdminSite(AdminSite):
    def each_context(self, request):
        context = super().each_context(request)
        context['extra_css'] = [
            '/static/admin/css/custom_admin.css',  # Ensure this path is correct
        ]
        return context

admin.site = CustomAdminSite()

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)