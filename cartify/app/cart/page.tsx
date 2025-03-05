"use client";
import React, { useState } from "react";
import Carousel from "../carousel/page";
import "../styles/cart.css";

const initialCartItems = [
    {
        id: 1,
        img: "LandingImg5.jpeg",
        name: "HERE&NOW",
        description: "Corduroy Weave Oversized Casual Shirt",
        seller: "Sixth Sense",
        price: "₹2,399",
        discount: "68% OFF",
        deliveryDate: "13 Mar 2025",
        quantity: 1,
    },
    {
        id: 2,
        img: "LandingImg4.jpeg",
        name: "Zara",
        description: "Slim Fit Casual Shirt",
        seller: "Zara Store",
        price: "₹1,999",
        discount: "50% OFF",
        deliveryDate: "15 Mar 2025",
        quantity: 2,
    },
    {
        id: 3,
        img: "LandingImg3.jpg",
        name: "Overcoat",
        description: "Women's Overcoat",
        seller: "Zara Store",
        price: "₹2,599",
        discount: "",
        deliveryDate: "20 Mar 2025",
        quantity: 10,
    },
];

const CartPage = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    // Function to update quantity
    const updateQuantity = (id, change) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) } // Ensure quantity is at least 1
                    : item
            )
        );
    };

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
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={`/images/${item.img}`} alt={item.name} className="cart-item-img" />
                            <div className="cart-item-details">
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <p className="seller">Sold by: {item.seller}</p>
                                <p className="price">
                                    <span className="original-price">{item.price}</span>
                                </p>
                                <p className="delivery">Delivery by {item.deliveryDate}</p>
                                <div className="quantity-control">
                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                            </div>
                            <input type="checkbox" className="cart-checkbox" />
                        </div>
                    ))}
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