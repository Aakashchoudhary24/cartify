"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/carousel.css";
import { gql } from 'graphql-request';
import { useFetchGraphQL } from "@/hooks";

const PRODUCTS_QUERY = gql`
  query {
    products {
      id
      image
      name
      price
    }
  }
`;

const CarouselPage = () => {
    const { data, loading, error } = useFetchGraphQL<{ products: { id: number, image: string, name: string, price: string }[] }>(PRODUCTS_QUERY);
    const products = data?.products || [];
    const [scrollIndex, setScrollIndex] = useState(0);
    const itemsPerView = 6;
    const scrollAmount = 183;

    const maxScrollIndex = products.length - itemsPerView; // Stop scrolling when full view can't be filled

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

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching products: {error.message}</p>;

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
                            {products.map((item) => (
                                <div key={item.id} className="item-card">
                                    <img src={`http://localhost:8000/media/${item.image}`} className="item-image" />
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

export default CarouselPage;
