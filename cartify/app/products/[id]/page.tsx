"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import styles from "../../styles/productinfo.module.css";
import Carousel from "../../carousel/page";
import Navbar from "@/app/components/Navbar";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "Unknown Product";
  const description = searchParams.get("description") || "No description available.";
  const price = searchParams.get("price") || "0";
  const image1 = searchParams.get("image1") || "/default.jpg";
  const image2 = searchParams.get("image2") || null;

  const [selectedSize, setSelectedSize] = useState("M");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);

  const images = [image1, image2].filter((img): img is string => Boolean(img));

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        // Start fade out transition
        setFadeIn(false);
        
        // After transition completes, change the image and fade in
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setFadeIn(true);
        }, 300); // This delay should be shorter than your CSS transition duration
        
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleThumbnailClick = (index: number) => {
    if (currentImageIndex !== index) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setFadeIn(true);
      }, 300);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        {/* Back Button */}
        <button className={styles.backButton} onClick={() => router.push("/products")}>
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>

        <div className={styles.productGrid}>
          {/* Image Gallery */}
          <div className={styles.imageSection}>
            <div className={styles.carousel}>
              <img
                src={images[currentImageIndex]}
                alt={name}
                className={`${styles.carouselImage} ${fadeIn ? styles.fadeIn : styles.fadeOut}`}
              />
            </div>
            
            {images.length > 1 && (
              <div className={styles.thumbnailContainer}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${name} thumbnail ${index + 1}`}
                    className={`${styles.thumbnail} ${currentImageIndex === index ? styles.activeThumbnail : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className={styles.detailsContainer}>
            <div className={styles.titleSection}>
              <h1 className={styles.productTitle}>{name}</h1>
            </div>

            {/* Price Section */}
            <div className={styles.priceSection}>
              <span className={styles.price}>Rs. {parseFloat(price).toFixed(2)}</span>
              <span className={styles.originalPrice}>Rs. {(parseFloat(price) * 1.2).toFixed(2)}</span>
              <span className={styles.discount}>16% OFF</span>
            </div>

            <div className={styles.divider}></div>

            <p className={styles.description}>{description}</p>

            {/* Size Selection */}
            <div className={styles.selectionSection}>
              <h3 className={styles.subheading}>Size</h3>
              <div className={styles.sizeOptions}>
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.selectedSize : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className={styles.selectionSection}>
              <h3 className={styles.subheading}>Quantity</h3>
              <div className={styles.quantitySelector}>
                <button className={styles.quantityButton} onClick={decreaseQuantity}>-</button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button className={styles.quantityButton} onClick={increaseQuantity}>+</button>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <button className={styles.addToCart}>Add to Cart</button>
              <button className={styles.checkout}>Buy Now</button>
            </div>
          </div>
        </div>
        
        <div className={styles.carouselGrid}>
          <h2 className={styles.sectionTitle}>You May Also Like</h2>
          <Carousel />
        </div>
      </div>
    </div>
  );
}