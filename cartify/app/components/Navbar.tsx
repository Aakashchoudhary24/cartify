"use client";
import React from "react";
import styles from "../styles/navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Navbar() {
    const router = useRouter();
    return (
        <>
            <nav className={styles.navbar}>
                <ul className={styles.navLinks}>
                    <li onClick={() => router.push("/")}>Home</li>
                    <li onClick={() => router.push("/product")}>Shop</li>
                    <li onClick={() => router.push("/about")}>About</li>
                    <li>
                        <span className={styles.logo}>Cartify</span>
                    </li>
                    <li onClick={() => router.push("/contact")}>Contact</li>
                    <li onClick={() => router.push("/login")}>Login</li>
                    <li className={styles.cartIcon} onClick={() => router.push("/cart")}>
                        <FaShoppingCart/>
                    </li>
                </ul>
            </nav>
            <main className={styles.landingMain}>
            </main>
        </>
    );
}
export default Navbar;
