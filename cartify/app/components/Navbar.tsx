"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use `usePathname` instead of `useRouter`

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Gets the current route path

  // Define the lavender color theme
  const bgColor = "bg-[#F4EEFF]";
  const textColor = "text-[#424874]";
  const accentColor = "bg-[#A6B1E1]";
  const activeLinkColor = "text-white bg-[#A6B1E1] rounded-full";

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
      <div className="flex items-center space-x-4">
        <Link href="/cart" className={textColor}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </Link>
        <Link href="/login" className="text-sm font-medium">Login</Link>
        <Link href="/signup" className={`px-4 py-2 rounded-full text-sm font-medium ${accentColor} text-white`}>
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
