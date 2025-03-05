"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/carousel.css";

const CartPage = () => {
    const recommendedItems = [
        { id: 1, img: "Jacket1.png", name: "Casual Jacket", price: "₹1,499" },
        { id: 2, img: "Sneaker1.png", name: "Sneakers", price: "₹2,999" },
        { id: 3, img: "Denim.png", name: "Denim Jeans", price: "₹1,899" },
        { id: 4, img: "smartwatch.png", name: "Smart Watch", price: "₹4,999" },
        { id: 5, img: "smartwatch.png", name: "Smart Watch", price: "₹4,999" },
        { id: 6, img: "smartwatch.png", name: "Smart Watch", price: "₹4,999" },
        { id: 7, img: "smartwatch.png", name: "Smart Watch", price: "₹4,999" },
        { id: 8, img: "smartwatch.png", name: "Smart Watch", price: "₹4,999" },
        { id: 9, img: "smartwatch.png", name: "Smart Watch", price: "₹4,999" },
        { id: 10, img: "smartwatch.png", name: "Smart Watch", price: "₹4,999" },
    ];

    const [scrollIndex, setScrollIndex] = useState(0);
    const itemsPerView = 6;
    const scrollAmount = 183;

    const maxScrollIndex = recommendedItems.length - itemsPerView; // Stop scrolling when full view can't be filled

    // Auto-scroll every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setScrollIndex((prev) =>
                prev < maxScrollIndex ? prev + 1 : 0 // Reset if we reach the end
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [maxScrollIndex]);

    const scrollLeft = () => {
        setScrollIndex((prev) => (prev > 0 ? prev - 1 : maxScrollIndex));
    };

    const scrollRight = () => {
        setScrollIndex((prev) => (prev < maxScrollIndex ? prev + 1 : 0));
    };

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                    integrity="sha384-TpJlARZ7aa7dBl0XXe9B6B6lM5LNx1wBbbNHs2mrz3lbjVdhBFjc/IHyVR1jE5v1"
                    crossOrigin="anonymous"
                />
            </Head>
            <div className="container d-flex flex-column align-items-center p-4">
                {/* Recommended Items Section */}
                <div className="carousel-wrapper">
                    <h2 className="text-dark fw-bold mb-3">Recommended for You</h2>

                    {/* Left Navigation Button */}
                    <button onClick={scrollLeft} className="carousel-btn left">
                        <ChevronLeft size={24} />
                    </button>

                    {/* Carousel Container */}
                    <div className="carousel-container">
                        <div
                            className="carousel-track"
                            style={{ transform: `translateX(-${scrollIndex * scrollAmount}px)` }}
                        >
                            {recommendedItems.map((item) => (
                                <div key={item.id} className="item-card">
                                    <img src={`/images/${item.img}`} alt={item.name} className="item-image" />
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-price">{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Navigation Button */}
                    <button onClick={scrollRight} className="carousel-btn right">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartPage;
