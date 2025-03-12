"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Navbar: React.FC = () => {

    const router = useRouter();
    const pathname = usePathname();
    const bgColor = "bg-[#F4EEFF]";
    const textColor = "text-[#424874]";
    const activeLinkColor = "text-white bg-[#A6B1E1] rounded-full";

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
        <nav className={`flex items-center justify-between px-8 py-6 ${bgColor} ${textColor}`}>
            <div className="flex items-center">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold flex items-center">
                    <span>CARTIFY</span>
                </Link>
            </div>
            
            {/* Center Navigation */}
            <div className="flex space-x-4">
                {[
                    { href: "/", label: "Home" },
                    { href: "/products", label: "Shop" },
                    { href: "/sale", label: "Sale" },
                    { href: "/about", label: "About" },
                    { href: "/showcase", label: "Showcase" },
                ].map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-2 text-lg font-medium ${
                            pathname === link.href ? activeLinkColor : ""
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
            
            {/* Right Navigation */}
            <div className="flex items-center gap-5">
                <ul className="flex items-center gap-5 text-lg font-medium">
                    {isAuthenticated ? (
                        <li 
                            onClick={handleLogout} 
                            className="cursor-pointer hover:text-[#A6B1E1] transition"
                        >
                            Logout
                        </li>
                    ) : (
                        <li 
                            onClick={() => router.push("/login")} 
                            className="cursor-pointer hover:text-[#A6B1E1] transition"
                        >
                            Login
                        </li>
                    )}

                    {!isAuthenticated && (
                        <li 
                            onClick={() => router.push('/signup')} 
                            className="cursor-pointer hover:text-[#A6B1E1] transition"
                        >
                            Sign Up
                        </li>
                    )}
                
                    {isAuthenticated && (
                        <li 
                            onClick={() => router.push("/cart")} 
                            className="cursor-pointer hover:text-[#A6B1E1] transition"
                        >
                            <FaShoppingCart />
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
