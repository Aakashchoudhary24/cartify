"use client";
import React, { useState, useEffect } from "react";
import Carousel from "../carousel/page";
import "../styles/cart.css";
import { useFetchGraphQL } from "@/hooks";
import { gql, request } from "graphql-request";
import Navbar from "../components/Navbar";
import { getCSRFToken } from "@/hooks";

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

const PROFILE_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

const CART_QUERY = gql`
  query {
    cart(userId: 6) {
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

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductFromCart($userId: Int!, $productId: Int!) {
    deleteProductFromCart(userId: $userId, productId: $productId) {
      id
      user
    }
  }
`;

const UPDATE_CART_PRODUCT_MUTATION = gql`
  mutation UpdateCartProduct($userId: Int!, $productId: Int!, $quantity: Int!) {
    updateCartProduct(userId: $userId, productId: $productId, quantity: $quantity) {
      id
      user
      items {
        product {
          id
          name
        }
        quantity
        subtotal
      }
      createdAt
    }
  }
`;

const CartPage = () => {
  const { data: cartData, loading: cartLoading, error: cartError } = useFetchGraphQL<CartData>(CART_QUERY);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
  const [donation, setDonation] = useState<number>(0);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [removeLoading, setRemoveLoading] = useState<number | null>(null);
  const [updateLoading, setUpdateLoading] = useState<number | null>(null);

  const [totals, setTotals] = useState({
    totalMRP: 0,
    platformFee: 20,
    shipping: 0,
    total: 0,
  });

  const refreshCartData = async () => {
    try {
      const endpoint = "http://127.0.0.1:8000/graphql/";
      const headers = { 'X-CSRFToken': getCSRFToken() };
      
      const result = await request(endpoint, CART_QUERY, {}, headers);
      if (result && result.cart && result.cart.items) {
        setCartItems(result.cart.items);
        setSelectedItems(new Array(result.cart.items.length).fill(true));
      }
    } catch (error) {
      console.error("Failed to refresh cart data:", error);
    }
  };

  useEffect(() => {
    if (cartData?.cart?.items) {
      setCartItems(cartData.cart.items);
      setSelectedItems(new Array(cartData.cart.items.length).fill(true));
    }
  }, [cartData]);

  useEffect(() => {
    updateTotals();
  }, [cartItems, selectedItems, donation]);

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
    const finalTotal = totalMRP + donation;

    setTotals({
      totalMRP,
      platformFee: 20,
      shipping: 0,
      total: finalTotal,
    });
  };

  const updateQuantity = async (index: number, change: number) => {
    const newQuantity = Math.max(1, cartItems[index].quantity + change);
    const productId = cartItems[index].product.id;
    const productName = cartItems[index].product.name;
    
    if (newQuantity === cartItems[index].quantity) return;
    
    setUpdateLoading(index);
    
    try {
      setCartItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = {
          ...newItems[index],
          quantity: newQuantity,
          subtotal: newItems[index].product.price * newQuantity,
        };
        return newItems;
      });
      
      const endpoint = "http://127.0.0.1:8000/graphql/";
      const headers = { 'X-CSRFToken': getCSRFToken() };
      
      const variables = {
        userId: 6,
        productId: productId,
        quantity: newQuantity
      };
      
      const result = await request(endpoint, UPDATE_CART_PRODUCT_MUTATION, variables, headers);
      
      await refreshCartData();
      
    } 
    catch (error) {
        console.error("Failed to update quantity:", error);
        
        // Revert the optimistic UI update
        setCartItems((prevItems) => {
          const newItems = [...prevItems];
          newItems[index] = {
            ...newItems[index],
            quantity: newItems[index].quantity - change,
            subtotal: newItems[index].product.price * (newItems[index].quantity - change),
          };
          return newItems;
        });
        
        setNotification({ 
          message: "Failed to update quantity. Please try again.", 
          type: "error" 
        });
    } finally {
      setUpdateLoading(null);
    }
  };

  const removeItem = async (index: number) => {
    const productId = cartItems[index].product.id;
    const productName = cartItems[index].product.name;
    
    setRemoveLoading(index);
    
    try {
      const endpoint = "http://127.0.0.1:8000/graphql/";
      const headers = { 'X-CSRFToken': getCSRFToken() };
      
      const variables = {
        userId: 9,
        productId: productId
      };
      
      const result = await request(endpoint, DELETE_PRODUCT_MUTATION, variables, headers);
      
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
    <>
      <Navbar />
    <div className="cart-container">

      
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
            <p>Flat 16% Discount on all Products on the Fresh Launch of Cartify.</p>
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
                    <button 
                      onClick={() => updateQuantity(index, -1)}
                      disabled={updateLoading === index}
                    >
                      -
                    </button>
                    <span>{updateLoading === index ? '...' : item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(index, 1)}
                      disabled={updateLoading === index}
                    >
                      +
                    </button>
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

        <div className="vertical-divider"></div>

        {/* Right Section - Price Summary */}
        <div className="cart-right">
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
    </>
  );
};

export default CartPage;