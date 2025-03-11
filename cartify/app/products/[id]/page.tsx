"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import styles from "../../styles/productinfo.module.css";
import Carousel from "../../carousel/page";

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

  const images = [image1, image2].filter((img): img is string => Boolean(img));

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
          
          {/* Back Button */}
          <button className={styles.backButton} onClick={() => router.push("/products")}>
            <ArrowLeft size={24} />
          </button>

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
        <div className={styles.carouselGrid}>
          <Carousel />
        </div>
      </div>
    </div>
  );
}
