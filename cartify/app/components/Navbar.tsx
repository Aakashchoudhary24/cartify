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
        <nav className={`flex items-center justify-between px-7 py-6 ${bgColor} ${textColor}`}>
            <div className="flex items-center">
                {/* Logo */}
                <Link href="/" className="text-xl ml-10 font-bold flex items-center">
                    <span>CARTIFY</span>
                </Link>
            </div>
            
            {/* Center Navigation */}
            <div className="flex space-x-4">
                {[
                    { href: "/", label: "Home" },
                    { href: "/products", label: "Shop" },
                    { href: "/about", label: "About" },
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
            <div className="flex items-center gap-5 mr-10">
                <ul className="flex items-center gap-5 text-lg font-medium">


                    {isAuthenticated && (
                        <li
                            onClick={() => router.push("/cart")}
                            className="cursor-pointer hover:text-[#A6B1E1] transition bg-[#A6B1E1] p-2 rounded-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </li>
                    )}
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
                
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
