"use client";
import React, { useState, useEffect } from "react";
import Carousel from "../carousel/page";
import "../styles/cart.css";
import { useFetchGraphQL } from "@/hooks";
import { gql, request } from "graphql-request";
import Navbar from "../components/Navbar";
import { getCSRFToken } from "@/hooks"; // Import the same CSRF token getter you use in ProductPage

// Define interfaces for type safety
interface Product {
  id: number;
  name: string;
  price: number;
  category: {
    name: string;
  };
  image1: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

interface CartData {
  cart: {
    items: CartItem[];
  };
}
interface ProfileData {
  me?: {
    id: number;
  };
}

// Query to get the current user's ID
const PROFILE_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

// Cart query
const CART_QUERY = gql`
  query {
    cart(userId: 9) {
      items {
        product {
          id
          name
          price
          category {
            name
          }
          image1
        }
        quantity
        subtotal
      }
    }
  }
`;

// Delete product mutation
const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductFromCart($userId: Int!, $productId: Int!) {
    deleteProductFromCart(userId: $userId, productId: $productId) {
      id
      user
    }
  }
`;

const CartPage = () => {
  const { data: cartData, loading: cartLoading, error: cartError, refetch } = useFetchGraphQL<CartData>(CART_QUERY);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
  const [donation, setDonation] = useState<number>(0);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [removeLoading, setRemoveLoading] = useState<number | null>(null); // Track which item is being removed

  // Calculate cart totals
  const [totals, setTotals] = useState({
    totalMRP: 0,
    platformFee: 20,
    shipping: 0,
    total: 0,
  });

  useEffect(() => {
    if (cartData?.cart?.items) {
      setCartItems(cartData.cart.items);
      setSelectedItems(new Array(cartData.cart.items.length).fill(true));
    }
  }, [cartData]);

  useEffect(() => {
    updateTotals();
  }, [cartItems, selectedItems, donation]);

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const updateTotals = () => {
    const selectedCartItems = cartItems.filter((_, index) => selectedItems[index]);
    const totalMRP = selectedCartItems.reduce((sum, item) => sum + item.subtotal, 0);
    const finalTotal = totalMRP + totals.platformFee + donation;

    setTotals({
      totalMRP,
      platformFee: 20,
      shipping: 0,
      total: finalTotal,
    });
  };

  const updateQuantity = (index: number, change: number) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        quantity: Math.max(1, newItems[index].quantity + change),
        subtotal: newItems[index].product.price * Math.max(1, newItems[index].quantity + change),
      };
      return newItems;
    });
  };

  const removeItem = async (index: number) => {
    // Get the product ID from the cart item
    const productId = cartItems[index].product.id;
    const productName = cartItems[index].product.name;
    
    setRemoveLoading(index);
    
    try {
      // Use the same endpoint you're using in ProductPage
      const endpoint = "http://127.0.0.1:8000/graphql/";
      const headers = { 'X-CSRFToken': getCSRFToken() };
      
      const variables = {
        userId: 9,
        productId: productId
      };
      
      const result = await request(endpoint, DELETE_PRODUCT_MUTATION, variables, headers);
      
      // Update the UI after successful deletion
      setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
      setSelectedItems((prevSelected) => prevSelected.filter((_, i) => i !== index));
      
      setNotification({ 
        message: `Removed ${productName} from your cart!`, 
        type: "success" 
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      setNotification({ 
        message: "Failed to remove item. Please try again.", 
        type: "error" 
      });
    } finally {
      setRemoveLoading(null);
    }
  };

  const toggleItemSelection = (index: number) => {
    setSelectedItems((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  const addDonation = (amount: number) => {
    setDonation((prev) => prev + amount);
  };

  if (cartLoading) return <p className="text-center text-gray-500">Loading your cart...</p>;
  if (cartError) return <p className="text-center text-red-500">Error fetching cart: {cartError.message}</p>;

  return (
    <div className="cart-container">
      <h1 className="cart-title">CARTIFY - Your Shopping Cart</h1>
      
      {notification.message && (
        <div className={`notification ${notification.type}`} style={{
          padding: '10px 15px',
          margin: '10px 0',
          borderRadius: '4px',
          backgroundColor: notification.type === 'success' ? '#d4edda' : '#f8d7da',
          color: notification.type === 'success' ? '#155724' : '#721c24',
          textAlign: 'center'
        }}>
          {notification.message}
        </div>
      )}
      
      <div className="cart-content">
        {/* Left Section - Cart Items */}
        <div className="cart-left">
          <div className="delivery-address">
            <h2>
              Deliver to: <span>Dattanand UD, 673004</span>
            </h2>
            <p>Flat C4, Devi Apartments, Puthiyara, Kozhikode</p>
            <button>Change Address</button>
          </div>

          <div className="offers-section">
            <h3>Available Offers</h3>
            <p>- 10% Instant Discount on Axis Bank Credit Card on a min spend of ₹3,500.</p>
          </div>

          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.product.image1 || "/images/placeholder.jpg"}
                  alt={item.product.name}
                  className="cart-item-img"
                  onError={(e) => ((e.target as HTMLImageElement).src = "/images/placeholder.jpg")}
                />
                <div className="cart-item-details">
                  <h2>{item.product.name}</h2>
                  <p>Category: {item.product.category.name}</p>
                  <p className="price">
                    <span className="original-price">₹{item.product.price}</span>
                  </p>
                  <p className="delivery">
                    Delivery by{" "}
                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                    })}
                  </p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeItem(index)}
                    disabled={removeLoading === index}
                  >
                    {removeLoading === index ? 'Removing...' : 'Remove'}
                  </button>
                </div>
                <input
                  type="checkbox"
                  checked={selectedItems[index]}
                  onChange={() => toggleItemSelection(index)}
                  className="cart-checkbox"
                />
              </div>
            ))
          ) : (
            <div className="empty-cart-message">
              <p>Your cart is empty. Start shopping to add items to your cart!</p>
            </div>
          )}
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
                <button key={amount} onClick={() => addDonation(amount)}>
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>
          <div className="price-summary">
            <h2>Price Details</h2>
            <div className="price-item">
              <span>Total MRP:</span>
              <span>₹{totals.totalMRP.toLocaleString("en-IN")}</span>
            </div>
            <div className="price-item">
              <span>Platform Fee:</span>
              <span>₹{totals.platformFee}</span>
            </div>
            <div className="price-item">
              <span>Donation:</span>
              <span>₹{donation}</span>
            </div>
            <div className="total-price">
              <span>Total:</span>
              <span>₹{totals.total.toLocaleString("en-IN")}</span>
            </div>
            <button className="place-order-btn" disabled={cartItems.length === 0}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
      <div className="carousel-section">
        <h2 className="recommended-heading">You may also like</h2>
        <Carousel />
      </div>
    </div>
  );
};

export default CartPage;


