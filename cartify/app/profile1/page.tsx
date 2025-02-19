'use client'

import React from 'react';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.sidebar}>
        {/* Add the profile avatar here */}
        <div className={styles.profileAvatar}>
          <img src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" alt="Profile Avatar" className={styles.avatarImage} />
          <h3>John Doe</h3>
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