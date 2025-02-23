"use client";
import Navbar from "../components/Navbar";
import styles from "../styles/forms.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Forms() {
    const router = useRouter()
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
                <div className={styles.signUpNow}>
                    <div className={styles.signUpNowParent}>
                        <h2 className={styles.signUpNow1}>Sign up now</h2>
                        <form>
                            <div className={styles.nameParent}>
                                <div className={styles.name}>
                                    <div className={styles.textField}>
                                        <label className={styles.label}>Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Unique username"
                                            className={styles.textField1}
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={styles.email}>
                                    <label className={styles.label}>Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={styles.textField1}
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
                                        className={styles.textField1}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <p className={styles.errorMessage}>
                                        Use 8 or more characters with a mix of letters, numbers & symbols
                                    </p>
                                </div>
                            </div>
                            <div className={styles.checkBoxParent}>
                                <div className={styles.checkBox}>
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className={styles.termsOfUse}>
                                        By creating an account, I agree to the {" "}
                                        <a href="#" className={styles.termsOfUse} style={{textDecoration: 'underline'}}>Terms of Use</a>
                                        {" "}and{" "}
                                        <a href="#" className={styles.termsOfUse} style={{ textDecoration: 'underline' }}>Privacy Policy</a>
                                    </span>
                                </div>
                                <div className={styles.checkBox}>
                                    <input
                                        type="checkbox"
                                        name="receiveUpdates"
                                        checked={formData.receiveUpdates}
                                        onChange={handleChange}
                                    />
                                    <span className={styles.termsOfUse}>
                                        I agree to receive updates, marketing promotions, and event notifications.
                                    </span>
                                </div>
                            </div>
                            <button type="submit" className={styles.button}>Sign Up</button>

                            <span className={styles.haveAnAccountLogin}>
                                Already have an account? {" "} <a href="#" className={styles.logIn} onClick={() => router.push('/login')}>Log in</a>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
