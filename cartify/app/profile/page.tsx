'use client'
import React from 'react';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.sidebar}>
        {/* Add the profile picture here */}
        <div className={styles.profilePicContainer}>
          <img
            src="https://via.placeholder.com/100" // Replace with your image URL
            alt="Profile"
            className={styles.profilePic}
          />
        </div>
        <h2>My Account</h2>
        <ul>
          <li className={styles.active}>Orders</li>
          <li>Address</li>
          <li>Contact Us</li>
          <li>Logout</li>
        </ul>
      </div>
      <div className={styles.content}>
        <h1>Welcome to Your Profile</h1>
        <p>Here you can manage your orders, update your address, and contact us for any queries.</p>
        <div className={styles.accountInfo}>
          <h2>Account Information</h2>
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;