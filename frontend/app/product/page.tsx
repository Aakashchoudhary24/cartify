'use client';
import React, { useState } from "react";
import styles from "../styles/ProductsPage.module.css"; 

const productsData = [
  { id: 1, name: "Autumn Dress", price: 85, originalPrice: 124, colors: 2, image: "autumn-dress.jpg" },
  { id: 2, name: "Casual Shirt", price: 29, originalPrice: 35, colors: 7, image: "casual-shirt.jpg" },
  { id: 3, name: "Leather Coat", price: 35, colors: 7, image: "leather-coat.jpg" },
  { id: 4, name: "VNeck Shirt", price: 230, colors: 3, image: "vneck-shirt.jpg" },
  { id: 5, name: "Long Coat Outer", price: 12, colors: 7, image: "long-coat-outer.jpg" },
  { id: 6, name: "Denim Jacket", price: 32, colors: 5, image: "denim-jacket.jpg" }
];

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [sortOption, setSortOption] = useState("popularity");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedProducts = [...filteredProducts];
    if (value === "priceLowHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "priceHighLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className={styles.productsContainer}>
      {/* Sidebar Filters */}
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Category</h3>
        <ul className={styles.sidebarList}>
          <li><input type="checkbox" defaultChecked className={styles.checkbox} /> Tops (37)</li>
          <li><input type="checkbox" className={styles.checkbox} /> Jackets (22)</li>
          <li><input type="checkbox" className={styles.checkbox} /> Sweaters (31)</li>
        </ul>
        <h3 className={styles.sidebarTitle}>Filters</h3>
        <ul className={styles.sidebarList}>
          <li><input type="checkbox" defaultChecked className={styles.checkbox} /> $20 - $100</li>
          <li><input type="checkbox" defaultChecked className={styles.checkbox} /> Medium</li>
        </ul>
      </div>

      {/* Products Section */}
      <div className={styles.productsSection}>
        <div className={styles.productsHeader}>
          <h2 className={styles.productsTitle}>
            Showing {filteredProducts.length} results from total {productsData.length} for "tops"
          </h2>
          <select onChange={handleSortChange} value={sortOption} className={styles.sortDropdown}>
            <option value="popularity">Sort by Popularity</option>
            <option value="priceLowHigh">Sort by Price: Low to High</option>
            <option value="priceHighLow">Sort by Price: High to Low</option>
          </select>
        </div>
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productColors}>{product.colors} Colors</p>
              <p className={styles.productPrice}>
                ${product.price} {product.originalPrice && <span className={styles.originalPrice}>${product.originalPrice}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
