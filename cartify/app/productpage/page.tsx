'use client'
import { useState } from "react";
import styles from "../styles/ProductPage.module.css";

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    name: "Boa Fleece Jacket",
    price: 122.0,
    originalPrice: 129.0,
    discount: "6% Off",
    rating: 4.9,
    reviews: "1.2K Reviews",
    description:
      "Introducing the Boa Fleece Winter Jacket, designed to keep you warm and comfortable during the coldest winter days.",
    colors: [
      { name: "Black", hex: "black" },
      { name: "Blue", hex: "blue" },
      { name: "Green", hex: "green" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/jacket-blue.png",
      "/jacket-green.png",
      "/jacket-gray.png",
    ],
    recommendations: [
      { name: "Adidas x Jolt", price: 349.0, image: "/shoes.png" },
      { name: "P.S Cap", price: 49.0, image: "/cap.png" },
      { name: "OS Beanie", price: 20.0, image: "/beanie.png" },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
      
        <div>
          <img src={product.images[0]} alt={product.name} className={styles.image} />
          <div className={styles.thumbnailContainer}>
            {product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt="Thumbnail" 
                className={styles.thumbnail} 
              />
            ))}
          </div>
        </div>

        
        <div>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <div className={styles.priceContainer}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
            <span className={styles.discount}>{product.discount}</span>
          </div>
          <div className={styles.rating}>⭐ {product.rating} ({product.reviews})</div>
          <p className={styles.description}>{product.description}</p>

      
          <div className={styles.colorSection}>
            <h3 className={styles.sectionTitle}>Available Colors</h3>
            <div className={styles.colorOptions}>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`${styles.colorButton} ${selectedColor === color.hex ? styles.selected : ""}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.hex)}
                ></button>
              ))}
            </div>
          </div>

 
          <div className={styles.sizeSection}>
            <h3 className={styles.sectionTitle}>Size</h3>
            <div className={styles.sizeOptions}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

  
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.addToCart}`}>Add to Cart</button>
            <button className={`${styles.button} ${styles.checkout}`}>Checkout Now</button>
          </div>
        </div>
      </div>


      <div className={styles.recommendations}>
        <h2 className={styles.recommendationsTitle}>You May Also Like</h2>
        <div className={styles.recommendationGrid}>
          {product.recommendations.map((item, index) => (
            <div key={index} className={styles.recommendationCard}>
              <img src={item.image} alt={item.name} className={styles.recommendationImage} />
              <h4 className={styles.recommendationName}>{item.name}</h4>
              <span className={styles.recommendationPrice}>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


