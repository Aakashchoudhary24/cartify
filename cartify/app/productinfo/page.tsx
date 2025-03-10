"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/productinfo.module.css";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = {
    name: "Boa Fleece Jacket",
    price: 122.0,
    rating: 4.9,
    reviews: "1.2K Reviews",
    description:
      "Introducing the Boa Fleece Winter Jacket, designed to keep you warm and comfortable during the coldest winter days.",
    sizes: ["S", "M", "L", "XL"],
    images: ["/images/h1.png", "/images/h1.png"],
    recommendations: [
      { name: "Adidas x Jolt", price: 349.0, image: "/images/h1.png" },
      { name: "P.S Cap", price: 49.0, image: "/images/h1.png" },
      { name: "OS Beanie", price: 20.0, image: "/images/h1.png" },
      { name: "NH X Hekknox Folding Tote", price: 39.9, image: "/images/h1.png" },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [product.images.length]);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.productGrid}>
          <div className={styles.carousel}>
            <div className={styles.carouselInner} style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
              {product.images.map((img, index) => (
                <img key={index} src={img} alt={`Slide ${index}`} className={styles.carouselImage} />
              ))}
            </div>
          </div>

          <div className={styles.verticalLine}></div>

          <div className={styles.detailsContainer}>
            <h1 className={styles.productTitle}>{product.name}</h1>
            
            {/* Updated Price Section */}
            <div className={styles.priceSection}>
              <span className={styles.price}>Rs. {product.price.toFixed(2)}</span>
            </div>

            <div className={styles.rating}>
              <div className={styles.starRating}>
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <span
                      key={index}
                      className={`${styles.star} ${ratingValue <= Math.floor(product.rating) ? styles.filled : ''}`}
                    >
                      ⭐
                    </span>
                  );
                })}
              </div>
              <span className={styles.reviews}>({product.reviews})</span>
            </div>
            <p className={styles.description}>{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className={styles.subheading}>Size</h3>
              <div className={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${selectedSize === size ? styles.selectedSize : ""}`}
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

        <div className={styles.recommendationsSection}>
          <h2 className={styles.sectionTitle}>You May Also Like</h2>
          <div className={styles.recommendationsGrid}>
            {product.recommendations.map((item, index) => (
              <div key={index} className={styles.recommendationCard}>
                <img src={item.image} alt={item.name} className={styles.recommendationImage} />
                <h3 className={styles.recommendationTitle}>{item.name}</h3>
                <span className={styles.recommendationPrice}>Rs. {item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}