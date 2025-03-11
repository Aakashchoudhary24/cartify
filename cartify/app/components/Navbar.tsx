"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Navbar() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getCookie = (name: string) => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split("=");
            if (cookieName === name) return cookieValue;
        }
        return null;
    };

    useEffect(() => {
        const token = getCookie("jwt");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsAuthenticated(false);
        router.push("/");
    };

    return (
        <>
            <nav className={styles.navbar}>
                <ul className={styles.navLinks}>
                    <li onClick={() => router.push("/")}>Home</li>
                    <li onClick={() => router.push("/products")}>Shop</li>
                    <li onClick={() => router.push("/about")}>About</li>
                    <li>
                        <span className={styles.logo}>Cartify</span>
                    </li>
                    <li onClick={() => router.push("/contact")}>Contact</li>
                    
                    {isAuthenticated ? (
                        <li onClick={handleLogout}>Logout</li>
                    ) : (
                        <li onClick={() => router.push("/login")}>Login</li>
                    )}
                    
                    <li className={styles.cartIcon} onClick={() => router.push("/cart")}>
                        <FaShoppingCart />
                    </li>
                </ul>
            </nav>

            <main className={styles.landingMain}></main>
        </>
    );
}

export default Navbar;
