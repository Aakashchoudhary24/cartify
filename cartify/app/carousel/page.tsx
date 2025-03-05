"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CartPage = () => {
    const recommendedItems = [
        { id: 1, img: "Jacket1.png", name: "Casual Jacket", price: "₹1,499" },
        { id: 2, img: "Sneaker1.png", name: "Sneakers", price: "₹2,999" },
        { id: 3, img: "Denim.png", name: "Denim Jeans", price: "₹1,899" },
        { id: 4, img: "rec4.jpeg", name: "Smart Watch", price: "₹4,999" },
    ];

    const [scrollIndex, setScrollIndex] = useState(0);
    const itemsPerView = 3;
    const scrollAmount = 200;

    const scrollLeft = () => {
        setScrollIndex((prev) => Math.max(prev - 1, 0));
    };

    const scrollRight = () => {
        setScrollIndex((prev) => Math.min(prev + 1, recommendedItems.length - itemsPerView));
    };

    return (
        <div className="flex justify-center p-4 flex-col items-center">
            {/*<div className="w-full max-w-5xl flex flex-col md:flex-row bg-white p-6">
                 Cart and Price Summary Sections 
            </div> */}

            {/* Recommended Items Section */}
            <div className="w-full max-w-5xl mt-6 bg-white p-6 rounded-lg relative">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Recommended for You</h2>

                {/* Navigation Buttons (Outside Container) */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full z-20 shadow-lg"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Product List Inside a Fixed Container */}
                <div className="w-full px-8 relative overflow-hidden">
                    <div
                        className="flex transition-transform space-x-2"
                        style={{ transform: `translateX(-${scrollIndex * scrollAmount}px)` }}
                    >
                        {recommendedItems.map((item) => (
                            <div key={item.id} className="w-48 p-2 flex-shrink-0">
                                <img src={`/images/${item.img}`} alt={item.name} className="w-full h-32 object-cover rounded" />
                                <p className="text-sm text-gray-700 mt-2 font-semibold">{item.name}</p>
                                <p className="text-blue-600 font-bold">{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons (Outside Container) */}
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full z-20 shadow-lg"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default CartPage;
