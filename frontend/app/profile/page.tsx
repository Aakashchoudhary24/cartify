'use client';
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useAuth } from "@/app/context/AuthContext";
import { request } from 'graphql-request';
import { gql } from "graphql-request";

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  return Object.fromEntries(
    document.cookie.split('; ').map(c => c.split('='))
  )['csrftoken'] || '';
};

const ORDERS_QUERY = gql`
  query Orders($userId: Int!) {
    orders(userId: $userId) {
      id
      user
      orderItems {
        id
        product {
          id
          name
          price
          image1
        }
        quantity
      }
    }
  }
`;

const ProfilePage = () => {
  const { user } = useAuth();
  
  const [ordersData, setOrdersData] = useState(null);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);
  
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Dilip kumar',
    lastName: 'Reddy',
    email: 'mdilip@gmail.com',
    phone: 'xxxxxxxxxx',
    username: 'dilip27m',
    address: 'ERT 2354, Leeds, East London, United Kingdom, Axxxxxx',
  });
  const [profileImage, setProfileImage] = useState(null);

  // Fetch orders data
  useEffect(() => {
    async function fetchOrders() {
      if (!user || !user.id) {
        setOrdersLoading(false);
        return;
      }
      
      const userId = parseInt(user.id);
      
      if (isNaN(userId)) {
        setOrdersError(new Error("Invalid user ID"));
        setOrdersLoading(false);
        return;
      }

      setOrdersLoading(true);
      setOrdersError(null);

      try {
        const endpoint = "http://127.0.0.1:8000/graphql/";
        const headers = { 'X-CSRFToken': getCSRFToken() };
        
        const result = await request(
          endpoint, 
          ORDERS_QUERY, 
          { userId }, 
          headers
        );
        
        setOrdersData(result);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrdersError(err);
      } finally {
        setOrdersLoading(false);
      }
    }

    // Only fetch orders when on orders tab
    if (activeSection === 'orders') {
      fetchOrders();
    }
  }, [user, activeSection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#ece2fd] min-h-screen">
      <Navbar />
      <div className="p-6 pt-24">
        {/* Main Container */}
        <div className="max-w-6xl mx-auto bg-[#DCD6F7] rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-[#424874] border-b border-[#A6B1E1]/20">
            <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          </div>

          {/* Content Area */}
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 bg-[#DCD6F7]">
              <nav className="py-6">
                {activeSection !== 'orders' && activeSection !== 'delete' && (
                  <div className="px-8 mb-4">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                        isEditing 
                          ? "bg-[#A6B1E1] text-white" 
                          : "bg-[#A6B1E1]/20 text-[#424874] hover:bg-[#A6B1E1]/30"
                      }`}
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>
                )}
                <ul>
                  <li>
                    <button
                      onClick={() => setActiveSection('profile')}
                      className={`w-full text-left px-8 py-3 flex items-center space-x-3 transition-colors ${
                        activeSection === 'profile'
                          ? 'bg-[#A6B1E1]/20 text-[#424874] border-l-4 border-[#424874]'
                          : 'text-[#424874] hover:bg-[#A6B1E1]/10'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>My Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('orders')}
                      className={`w-full text-left px-8 py-3 flex items-center space-x-3 transition-colors ${
                        activeSection === 'orders'
                          ? 'bg-[#A6B1E1]/20 text-[#424874] border-l-4 border-[#424874]'
                          : 'text-[#424874] hover:bg-[#A6B1E1]/10'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Orders</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSection('delete')}
                      className={`w-full text-left px-8 py-3 flex items-center space-x-3 transition-colors ${
                        activeSection === 'delete'
                          ? 'bg-red-900/20 text-red-400 border-l-4 border-red-500'
                          : 'text-red-400 hover:bg-red-900/10'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Delete Account</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 bg-[#d4cdf1] p-8">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#A6B1E1] to-[#424874] flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl font-bold text-white">DK</span>
                        )}
                      </div>
                      {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <label htmlFor="profile-upload" className="cursor-pointer text-xs text-[#424874] text-center p-2">
                            Change Photo
                            <input
                              id="profile-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#424874]">{profile.firstName} {profile.lastName}</h2>
                      <p className="text-[#424874]">@{profile.username}</p>
                    </div>
                  </div>

                  {/* Personal Information Card */}
                  <div className="bg-[#DCD6F7] rounded-xl overflow-hidden shadow-lg">
                    <div className="px-6 py-4 bg-[#424874] border-b border-white">
                      <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#424874] mb-1">First Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="firstName"
                              value={profile.firstName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#424874] border border-[#A6B1E1]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#A6B1E1] focus:border-transparent"
                            />
                          ) : (
                            <p className="text-[#424874]">{profile.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#424874] mb-1">Last Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="lastName"
                              value={profile.lastName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#424874] border border-[#A6B1E1]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#A6B1E1] focus:border-transparent"
                            />
                          ) : (
                            <p className="text-[#424874]">{profile.lastName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#424874] mb-1">Email Address</label>
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={profile.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#424874] border border-[#A6B1E1]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#A6B1E1] focus:border-transparent"
                            />
                          ) : (
                            <p className="text-[#424874]">{profile.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#424874] mb-1">Phone</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="phone"
                              value={profile.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#424874] border border-[#A6B1E1]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#A6B1E1] focus:border-transparent"
                            />
                          ) : (
                            <p className="text-[#424874]">{profile.phone}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#424874] mb-1">Username</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="username"
                              value={profile.username}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#424874] border border-[#A6B1E1]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#A6B1E1] focus:border-transparent"
                            />
                          ) : (<p className="text-[#424874]">{profile.username}</p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-[#424874] mb-1">Address</label>
                          {isEditing ? (
                            <textarea
                              name="address"
                              value={profile.address}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#424874] border border-[#A6B1E1]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#A6B1E1] focus:border-transparent"
                              rows="3"
                            />
                          ) : (
                            <p className="text-[#424874]">{profile.address}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Section */}
              {activeSection === 'orders' && (
                <div className="bg-[#DCD6F7] rounded-xl overflow-hidden shadow-lg">
                  <div className="px-6 py-4 bg-[#424874] border-b border-[#A6B1E1]/20">
                    <h3 className="text-lg font-semibold text-white">Orders</h3>
                  </div>
                  <div className="p-8 flex items-center justify-center min-h-[300px]">
                    {ordersLoading ? (
                      <p className="text-[#424874]">Loading orders...</p>
                    ) : ordersError ? (
                      <p className="text-red-500">Error fetching orders: {ordersError.message}</p>
                    ) : ordersData && ordersData.orders && ordersData.orders.length > 0 ? (
                      <div className="space-y-4">
                        {ordersData.orders.map((order) => (
                          <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-[#424874]">Order #{order.id}</h4>
                            <ul className="mt-2 space-y-2">
                              {order.orderItems.map((item) => (
                                <li key={item.id} className="flex items-center space-x-4">
                                  <img src={item.product.image1 || "/images/placeholder.jpg"} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                                  <div>
                                    <p className="text-[#424874] font-medium">{item.product.name}</p>
                                    <p className="text-[#424874]">Quantity: {item.quantity}</p>
                                    <p className="text-[#424874]">Price: ₹{item.product.price}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#424874]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="mt-4 text-[#424874]">No orders found</p>
                        <button className="mt-4 px-4 py-2 bg-[#A6B1E1]/20 text-[#424874] rounded-lg hover:bg-[#A6B1E1]/30 transition-colors">
                          Browse Products
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Delete Account Section */}
              {activeSection === 'delete' && (
                <div className="bg-[#DCD6F7] rounded-xl overflow-hidden shadow-lg">
                  <div className="px-6 py-4 bg-[#424874] border-b border-red-900/20">
                    <h3 className="text-lg font-semibold text-white">Delete Account</h3>
                  </div>
                  <div className="p-8">
                    <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <h4 className="text-red-400 font-medium">Warning: This action cannot be undone</h4>
                          <p className="text-[#424874] mt-1">
                            All of your data will be permanently removed from our servers. This includes your profile information, order history, and saved addresses.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-[#A6B1E1]/10 pt-6">
                      <h4 className="text-[#424874] font-medium mb-4">Confirm account deletion</h4>
                      <p className="text-[#424874] mb-6">Please type "DELETE" to confirm you want to permanently delete your account.</p>
                      
                      <div className="mb-6">
                        <input
                          type="text"
                          placeholder="Type DELETE to confirm"
                          className="w-full px-4 py-2.5 rounded-lg bg-[#424874] border border-red-500/30 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      
                      <button className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Permanently Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;