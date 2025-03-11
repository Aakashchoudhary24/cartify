"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gql } from "graphql-request";
import { useFetchGraphQL } from "@/hooks";
import styles from "../styles/products.module.css";

// Define Product Interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
  };
  gender: string;
  image1: string;
}

// Define API Response Interface
interface ProductsResponse {
  products: Product[];
}

// GraphQL Query
const PRODUCTS_QUERY = gql`
  query {
    products {
      id
      name
      description
      price
      category {
        name
      }
      gender
      image1
      image2
    }
  }
`;

const ProductsPage: React.FC = () => {
  const { data, loading, error } = useFetchGraphQL<ProductsResponse>(PRODUCTS_QUERY);
  const products: Product[] = data?.products || [];

  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (products.length > 0) {
      setSortedProducts(products);
    }
  }, [products]);

  useEffect(() => {
    let filteredProducts = [...products];

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category?.name || "")
      );
    }

    if (selectedGenders.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedGenders.includes(product.gender)
      );
    }

    if (JSON.stringify(filteredProducts) !== JSON.stringify(sortedProducts)) {
      setSortedProducts(filteredProducts);
    }
  }, [selectedCategories, selectedGenders, products]);

  const handleCategoryFilterChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const handleGenderFilterChange = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const categories = [...new Set(products.map((p) => p.category.name))];
  const genders = [...new Set(products.map((p) => p.gender))];

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error fetching products: {error.message}</p>;

  return (
    <div className={styles.container}>
      {/* Sidebar for Filters */}
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>CATEGORIES</h3>
        <div className={styles.categoryButtons}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${styles.categoryButton} ${
                selectedCategories.includes(category) ? styles.activeButton : ""
              }`}
              onClick={() => handleCategoryFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <h3 className={styles.sidebarTitle}>GENDER</h3>
        <div className={styles.categoryButtons}>
          {genders.map((gender, index) => (
            <button
              key={index}
              className={`${styles.categoryButton} ${
                selectedGenders.includes(gender) ? styles.activeButton : ""
              }`}
              onClick={() => handleGenderFilterChange(gender)}
            >
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className={styles.content}>
        <h2 className={styles.collectionTitle}>Product Collection</h2>
        <div className={styles.productGrid}>
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() =>
                router.push(
                  `/products/${product.id}?name=${encodeURIComponent(
                    product.name
                  )}&description=${encodeURIComponent(
                    product.description
                  )}&price=${product.price}&image=${encodeURIComponent(product.image1)}`
                )
              }
            >
              <div className={styles.cardInner}>
                {/* Front Side */}
                <div className={styles.cardFront}>
                  <img src={product.image1} alt={product.name} className={styles.productImage} />
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <span className={styles.productPrice}>Rs. {product.price}</span>
                  </div>
                </div>

                {/* Back Side */}
                <div className={styles.cardBack}>
                  <h3 className={styles.fullProductName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <span className={styles.productPrice}>Rs. {product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
