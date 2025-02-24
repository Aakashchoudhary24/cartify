'use client'
import { useState } from "react";
import styles from "../styles/AccountSettings.module.css"; 

export default function AccountSettings() {
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <h2>Account Settings</h2>
          <ul>
            {[
              { name: "Profile", key: "profile" },
              { name: "Security", key: "security" },
              { name: "Orders", key: "orders" },
              { name: "Logout", key: "logout" },
            ].map((item) => (
              <li
                key={item.key}
                className={selectedTab === item.key ? styles.active : ""}
                onClick={() => setSelectedTab(item.key)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

      
        <div className={styles.content}>
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
      <h2>My Profile</h2>
      <div>
        <p><strong>First Name:</strong> first name</p>
        <p><strong>Last Name:</strong> lastname</p>
        <p><strong>Email:</strong> abc@gmail.com</p>
        <p><strong>Phone:</strong> 9876543210</p>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div>
      <h2>Security Settings</h2>
      <div>
        <p><strong>Email:</strong> gmail.com</p>
        <button className={styles.button}>Edit Email</button> 
        <p><strong>Password:</strong> ********</p>
        <button className={styles.button}>Change Password</button>  
      </div>
    </div>
  );
}

function OrdersSection() {
  return (
    <div>
      <h2>My Orders</h2>
      <div>
        <p>No recent orders found.</p>
      </div>
    </div>
  );
}
