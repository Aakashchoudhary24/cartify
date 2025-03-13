"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
        <motion.nav 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center justify-between h-23 px-7 py-6 ${bgColor} ${textColor}`}
        >
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/" className="text-xl ml-10 font-bold flex items-center">
                    <span>CARTIFY</span>
                </Link>
            </motion.div>
            
            <motion.div className="flex space-x-4">
                {[{ href: "/", label: "Home" }, { href: "/products", label: "Shop" }, { href: "/about", label: "About" }].map((link, index) => (
                    <motion.div 
                        key={link.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href={link.href} 
                            className={`px-4 py-2 text-lg font-medium transition ${
                                pathname === link.href ? activeLinkColor : "hover:text-[#A6B1E1]"
                            }`}
                        >
                            {link.label}
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
            
            <motion.div className="flex items-center gap-5 mr-10">
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
                        <motion.li 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer hover:text-[#A6B1E1] transition"
                            onClick={handleLogout}
                        >
                            Logout
                        </motion.li>
                    ) : (
                        <>
                            <motion.li 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer hover:text-[#A6B1E1] transition"
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </motion.li>
                            <motion.li 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer hover:text-[#A6B1E1] transition"
                                onClick={() => router.push("/signup")}
                            >
                                Sign Up
                            </motion.li>
                        </>
                    )}
                </ul>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;