import strawberry
from typing import List, Optional
from datetime import datetime
from django.contrib.auth.models import User
from .models import Category, Brand, Product, Profile, Cart, CartItem, Order, OrderItem
from strawberry.tools import merge_types
from authentication.schema import AuthQuery, AuthMutation

@strawberry.type
class CategoryType:
    id: int
    name: str
    description: Optional[str]

@strawberry.type
class BrandType:
    id: int
    name: str

@strawberry.type
class ProductType:
    id: int
    name: str
    description: str
    price: float
    gender: str
    category: CategoryType
    image1: Optional[str]
    image2: Optional[str]
    image3: Optional[str]
    brand: Optional[BrandType]
    colour: Optional[str]

@strawberry.type
class ProfileType:
    user: str
    address: str
    first_name: str
    last_name: str
    phone_number: str

@strawberry.type
class CartItemType:
    id: int
    product: ProductType
    quantity: int

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
class Query:
    @strawberry.field
    def categories(self) -> List[CategoryType]:
        return Category.objects.all()

    @strawberry.field
    def brands(self) -> List[BrandType]:
        return Brand.objects.all()

    @strawberry.field
    def products(self) -> List[ProductType]:
        return Product.objects.all()

    @strawberry.field
    def profile(self, user_id: int) -> Optional[ProfileType]:
        profile = Profile.objects.filter(user__id=user_id).first()
        if profile:
            return ProfileType(
                user=profile.user.username,
                address=profile.address,
                first_name=profile.first_name,
                last_name=profile.last_name,
                phone_number=profile.phone_number,
            )
        return None

    @strawberry.field
    def cart(self, user_id: int) -> Optional[CartType]:
        cart = Cart.objects.filter(user__id=user_id).first()
        if cart:
            return CartType(
                id=cart.id,
                user=cart.user.username,
                items=cart.items.all(),
                created_at=cart.created_at,
            )
        return None

    @strawberry.field
    def orders(self, user_id: int) -> List[OrderType]:
        return Order.objects.filter(user__user__id=user_id)

@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_product(self, name: str, description: str, price: float, gender: str, category_id: int, brand_id: Optional[int], colour: Optional[str]) -> ProductType:
        category = Category.objects.get(id=category_id)
        brand = Brand.objects.get(id=brand_id) if brand_id else None
        product = Product.objects.create(name=name, description=description, price=price, gender=gender, category=category, brand=brand, colour=colour)
        return product

    @strawberry.mutation
    def create_cart(self, user_id: int) -> CartType:
        user = User.objects.get(id=user_id)
        cart = Cart.objects.create(user=user)
        return cart

    @strawberry.mutation
    def place_order(self, user_id: int, total_price: float) -> OrderType:
        user = Profile.objects.get(user__id=user_id)
        order = Order.objects.create(user=user, total_price=total_price, status="Pending")
        return order

MergedQuery = merge_types("MergedQuery", (AuthQuery, Query))
MergedMutation = merge_types("MergedMutation", (AuthMutation, Mutation))

schema = strawberry.Schema(query=MergedQuery, mutation=MergedMutation)
