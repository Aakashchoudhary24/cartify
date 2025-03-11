import strawberry
from typing import List, Optional
from datetime import datetime
from django.contrib.auth.models import User
from .models import Category, Product, Cart, CartItem, Order, OrderItem, Payment
from strawberry.tools import merge_types
from authentication.schema import AuthQuery, AuthMutation
from strawberry.tools import merge_types


from django.core.mail import send_mail
from django.conf import settings
from typing import Optional

MergedQuery = merge_types("MergedQuery", (AuthQuery,))
MergedMutation = merge_types("MergedMutation", (AuthMutation,))

Query = merge_types("Query", (AuthQuery,))
Mutation = merge_types("Mutation", (AuthMutation,))

@strawberry.type
class CategoryType:
    id: int
    name: str
    description: Optional[str]

@strawberry.type
class ProductType:
    id: int
    name: str
    description: str
    price: float
    stock: int
    category: CategoryType
    image: Optional[str]
    created_at: datetime

@strawberry.type
class CartItemType:
    id: int
    product: ProductType
    quantity: int
    subtotal: float

    @strawberry.field
    def subtotal(self) -> float:
        return self.quantity * self.product.price

@strawberry.type
class CartType:
    id: int
    user: str
    items: List[CartItemType]
    created_at: datetime

@strawberry.type
class OrderItemType:
    id: int
    product: ProductType
    quantity: int
    price: float

@strawberry.type
class OrderType:
    id: int
    user: str
    total_price: float
    status: str
    created_at: datetime
    order_items: List[OrderItemType]

@strawberry.type
class PaymentType:
    id: int
    order: OrderType
    method: str
    amount: float
    status: str
    transaction_id: Optional[str]
    created_at: datetime
    

@strawberry.type
class Query:
    @strawberry.field
    def categories(self) -> List[CategoryType]:
        return Category.objects.all()

    @strawberry.field
    def products(self) -> List[ProductType]:
        return Product.objects.all()

    @strawberry.field
    def cart(self, user_id: int) -> Optional[CartType]:
        return Cart.objects.filter(user__id=user_id).first()

    @strawberry.field
    def orders(self, user_id: int) -> List[OrderType]:
        return Order.objects.filter(user__id=user_id)

@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_product(self, name: str, description: str, price: float, stock: int, category_id: int) -> ProductType:
        category = Category.objects.get(id=category_id)
        product = Product.objects.create(name=name, description=description, price=price, stock=stock, category=category)
        return product

    @strawberry.mutation
    def create_cart(self, user_id: int) -> CartType:
        user = User.objects.get(id=user_id)
        cart = Cart.objects.create(user=user)
        return cart

    @strawberry.mutation
    def place_order(self, user_id: int, total_price: float) -> OrderType:
        user = User.objects.get(id=user_id)
        order = Order.objects.create(user=user, total_price=total_price, status="Pending")
        return order

schema = strawberry.Schema(query=MergedQuery, mutation=MergedMutation)


import strawberry
from .models import Order
from .utils import send_order_confirmation_email

@strawberry.type
class Mutation:
    @strawberry.mutation
    def send_order_email(self, user_email: str) -> bool:
        try:
            send_order_confirmation_email(user_email)
            print(f"📧 Email sent to {user_email}")
            return True
        except Exception as e:
            print(f"❌ Error sending email: {e}")
            return False


schema = strawberry.Schema(query=Query, mutation=Mutation)  # ✅ Fix: Added query


# mutation {
#   sendOrderEmail(userEmail: "test@example.com")
# }