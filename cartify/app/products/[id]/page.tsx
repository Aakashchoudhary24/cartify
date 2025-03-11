"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../../styles/productinfo.module.css";
import Link from "next/link";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "Unknown Product";
  const description = searchParams.get("description") || "No description available.";
  const price = searchParams.get("price") || "0";
  const image = searchParams.get("image") || "/default.jpg"; // Fallback image

  const [selectedSize, setSelectedSize] = useState("M");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Example: If you had multiple images, you could rotate them here
  const images = [image]; // Add more image URLs if available

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.productGrid}>
          {/* Image Display */}
          <div className={styles.carousel}>
            <img
              src={images[currentImageIndex]}
              alt={name}
              className={styles.carouselImage}
            />
          </div>

          <div className={styles.verticalLine}></div>

          {/* Product Details */}
          <div className={styles.detailsContainer}>
            <h1 className={styles.productTitle}>{name}</h1>

            {/* Price Section */}
            <div className={styles.priceSection}>
              <span className={styles.price}>Rs. {parseFloat(price).toFixed(2)}</span>
            </div>

            <p className={styles.description}>{description}</p>

            {/* Size Selection */}
            <div>
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

            <div className={styles.buttonContainer}>
              <button className={styles.addToCart}>Add to Cart</button>
              <button className={styles.checkout}>Checkout Now</button>
            </div>
          </div>
        </div>

        {/* Similar Product Recommendations - Static for now */}
        <div className={styles.recommendationsSection}>
          <h2 className={styles.sectionTitle}>You May Also Like</h2>
          <div className={styles.recommendationsGrid}>
            {/* Placeholder Recommendations */}
            {[1, 2, 3, 4].map((num) => (
              <Link
                href={`/product/${num}`}
                key={num}
                className={styles.recommendationCard}
              >
                <img src="/default.jpg" alt="Recommended Product" className={styles.recommendationImage} />
                <h3 className={styles.recommendationTitle}>Product {num}</h3>
                <span className={styles.recommendationPrice}>Rs. {999 + num * 10}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
