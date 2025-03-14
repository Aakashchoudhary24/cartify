"use client";
import React, { useState } from "react";
import Carousel from "../carousel/page";
import "../styles/cart.css";
import { useFetchGraphQL } from "@/hooks";
import { gql } from 'graphql-request';

interface cart {
    id: number;
    name: string;
    description: string;
    price: number; 
    image?: string;
    category: { name: string };
}

const query = gql`
  query {
    products {
      id
      name
      description
      price
      image
      category {
        name
      }
    }
  }
`;

const initialCartItems = [
  // Example initial cart items
  { id: 1, name: "Product 1", description: "Description 1", price: 100, img: "product1.jpg", seller: "Seller 1", deliveryDate: "Tomorrow", quantity: 1 },
  { id: 2, name: "Product 2", description: "Description 2", price: 200, img: "product2.jpg", seller: "Seller 2", deliveryDate: "Tomorrow", quantity: 1 },
];

const CartPage = () => {
    const { data, loading, error } = useFetchGraphQL<{ products: Product[] }>(query);
    const items = data?.products || [];
    const [cartItems, setCartItems] = useState(initialCartItems);

    // Function to update quantity
    const updateQuantity = (id: number, change: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) } // Ensure quantity is at least 1
                    : item
            )
        );
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching product information: {error.message}</p>;

    return (
        <div className="cart-container">
            {/* Main Heading */}
            <h1 className="cart-title">CARTIFY - Your Shopping Cart</h1>

            <div className="cart-content">
                {/* Left Section - Cart Items */}
                <div className="cart-left">
                    {/* Delivery Address */}
                    <div className="delivery-address">
                        <h2>
                            Deliver to: <span>Dattanand UD, 673004</span>
                        </h2>
                        <p>Flat C4, Devi Apartments, Puthiyara, Kozhikode</p>
                        <button>Change Address</button>
                    </div>

                    {/* Available Offers */}
                    <div className="offers-section">
                        <h3>Available Offers</h3>
                        <p>- 10% Instant Discount on Axis Bank Credit Card on a min spend of ₹3,500.</p>
                    </div>

                    {/* Cart Items */}
                    {cartItems.map((cartItem) => {
                        const item = items.find((product) => product.id === cartItem.id);
                        return (
                            <div key={cartItem.id} className="cart-item">
                                <img src={`http://localhost:8000/media/${item?.image}`} alt={cartItem.name} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <h2>{item?.name || cartItem.name}</h2>
                                    <p>{item?.description || cartItem.description}</p>
                                    <p className="seller">Category: {item?.category.name || cartItem.seller}</p>
                                    <p className="price">
                                        <span className="original-price">{item?.price || cartItem.price}</span>
                                    </p>
                                    <p className="delivery">Delivery by {cartItem.deliveryDate}</p>
                                    <div className="quantity-control">
                                        <button onClick={() => updateQuantity(cartItem.id, -1)}>-</button>
                                        <span>{cartItem.quantity}</span>
                                        <button onClick={() => updateQuantity(cartItem.id, 1)}>+</button>
                                    </div>
                                </div>
                                <input type="checkbox" className="cart-checkbox" />
                            </div>
                        );
                    })}
                </div>

                {/* Vertical Line */}
                <div className="vertical-divider"></div>

                {/* Right Section - Price Summary */}
                <div className="cart-right">
                    <div className="apply-coupons">
                        <h2>Apply Coupons</h2>
                        <button>Apply</button>
                    </div>
                    <div className="donation-section">
                        <h2>Donate and Make a Difference</h2>
                        <div className="donation-buttons">
                            {[10, 20, 50, 100].map((amount) => (
                                <button key={amount}>₹{amount}</button>
                            ))}
                        </div>
                    </div>
                    <div className="price-summary">
                        <h2>Price Details</h2>
                        <div className="price-item">
                            <span>Total MRP:</span>
                            <span>₹4,098</span>
                        </div>
                        <div className="price-item">
                            <span>Discount:</span>
                            <span className="discount">-₹2,992</span>
                        </div>
                        <div className="price-item">
                            <span>Platform Fee:</span>
                            <span>₹20</span>
                        </div>
                        <div className="price-item">
                            <span>Shipping:</span>
                            <span className="discount">FREE</span>
                        </div>
                        <div className="total-price">
                            <span>Total:</span>
                            <span>₹1,126</span>
                        </div>
                        <button className="place-order-btn">PLACE ORDER</button>
                    </div>
                </div>
            </div>

            {/* Carousel Section - Full Width */}
            <div className="carousel-section">
                <Carousel />
            </div>
        </div>
    );
};

export default CartPage;