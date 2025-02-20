'use client'
import { useState } from "react";

export default function AccountSettings() {
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-3/5 h-full bg-white p-6 rounded-lg shadow-md">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <ul className="space-y-2">
            {[
              { name: "Profile", key: "profile" },
              { name: "Security", key: "security" },
              { name: "Orders", key: "orders" },
              { name: "Logout", key: "logout" },
            ].map((item) => (
              <li
                key={item.key}
                className={`cursor-pointer p-2 rounded-md ${
                  selectedTab === item.key ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedTab(item.key)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Main Content */}
        <div className="w-3/4 bg-white p-6 rounded-lg shadow-md ml-6">
          {selectedTab === "profile" && <ProfileSection />}
          {selectedTab === "security" && <SecuritySection />}
          {selectedTab === "orders" && <OrdersSection />}
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div>
          <h3 className="text-lg font-medium">Rafiqul Rahman</h3>
          <p className="text-gray-500">Team Manager</p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <p><strong>First Name:</strong> Rafiqul</p>
        <p><strong>Last Name:</strong> Rahman</p>
        <p><strong>Email:</strong> rafiqurrahman51@gmail.com</p>
        <p><strong>Phone:</strong> +09 345 346 46</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Addresses</h3>
        <div className="mb-2">
          <p><strong>Country:</strong> United Kingdom</p>
          <p><strong>City/State:</strong> Leeds, East London</p>
          <p><strong>Postal Code:</strong> ERT 2354</p>
        </div>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add New Address</button>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <p><strong>Email:</strong> rafiqurrahman51@gmail.com</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Edit Email</button>
        <p className="mt-4"><strong>Password:</strong> ********</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Change Password</button>
      </div>
    </div>
  );
}

function OrdersSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <p>No recent orders found.</p>
      </div>
    </div>
  );
}
