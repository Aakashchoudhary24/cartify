"use client";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Navbar() {
    const router = useRouter();
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.logo} onClick={() => router.push("/")}>CARTIFY</div>
                <ul className={styles.navLinks}>
                    <li onClick={() => router.push("/products")}>SHOP</li>
                    <li onClick={() => router.push("/")}>HOME</li>
                    <li onClick={() => router.push("/about")}>ABOUT</li>
                    <li onClick={() => router.push("/login")}>LOGIN</li>
                </ul>
                <div className={styles.searchBox}>
                    <span className={styles.searchIcon}>
                        <FaSearch />
                    </span>
                    <input type="text" placeholder="Search..." />
                </div>

                <div className={styles.cartIcon} onClick={() => router.push("/cart")}>
                    <FaShoppingCart /> {' '}CART
                </div>
            </nav>
        </>
    );
}

export default Navbar;
