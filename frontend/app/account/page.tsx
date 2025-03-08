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
    <form className={styles.smallcontainer}>
      <div className={styles.personalinfoContainer}>
      <h2>Personal information</h2>
      <button className={styles.button}>Edit</button>
      </div>
      <div>
      <span><label>First name</label></span>
      <span><input className={styles.input} type="text" value="first name" disabled/></span>
      </div>
      <div>
      <label>Last name</label>
      <input className={styles.input} type="text" value="last name" disabled/>
      </div>
     <div>
      <label>Email</label>
      <input className={styles.input} type="text" value="email" disabled/></div>
      <div>
      <label>Phone number </label>
      <input className={styles.input} type="number" value="Phone number" disabled/>
      </div>
    </form>
    <form >
      <div>
      <h2>Address</h2>
      <button className={styles.button}>Edit</button>
      </div>
      <div></div>
      <label>country</label>
      <input className={styles.input} type="text" value="country" disabled/>
      
      <div>
      <label>State</label>
      <input className={styles.input} type="text" value="first name" disabled/>
      </div>
      <div>
      <label>city</label>
      <input className={styles.input} type="text" value="first name" disabled/>
      </div>
      <div>
      <label>street</label>
      <input className={styles.input}type="text" value="first name" disabled/>
      </div>
      <div>
      <label>pincode</label>
      <input className={styles.input} type="text" value="first name" disabled/>
      </div>
    </form>
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
