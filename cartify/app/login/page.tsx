"use client";
import React from 'react'
import { useState } from 'react';
import Navbar from "../components/navbar";
import styles from "../styles/forms.module.css"

export default function page() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        agreeTerms: false,
        receiveUpdates: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <>
            <Navbar />
            <div className={styles.homePage}>
                <div className={styles.headlineAndSubhead}>
                    <h1 className={styles.designWithUs}>Cartify</h1>
                    <p className={styles.accessToThousandsContainer}>
                        Be Bold, Be Fashionable
                    </p>
                </div>
                <div className={styles.loginNow}>
                    <div className={styles.signUpNowParent}>
                        <h2 className={styles.signUpNow1}>Login to Your Account</h2>
                        <form>
                            <div className={styles.nameParent}>
                                <div className={styles.email}>
                                    <label className={styles.label}>Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={styles.textFieldLogin}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.email}>
                                    <label className={styles.label}>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={styles.textFieldLogin}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <p className={styles.errorMessage}>
                                        Forgot your Password? {" "}<a href="#" className={styles.logIn}>Click here</a>
                                    </p>
                                </div>
                            </div>

                            <button type="submit" className={styles.button}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
