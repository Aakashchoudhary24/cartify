"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gql } from "graphql-request";
import { useFetchGraphQL } from "@/hooks";
import styles from "../styles/products.module.css";
import Navbar from "../components/Navbar";

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
  image2: string;
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
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 10000]);
  const router = useRouter();

  // References for min and max range inputs
  const minRangeRef = useRef<HTMLInputElement>(null);
  const maxRangeRef = useRef<HTMLInputElement>(null);

  // Constants for price range
  const MIN_PRICE = 1000;
  const MAX_PRICE = 10000;
  const RANGE_GAP = 500; // Minimum gap between min and max values

  // Sidebar scroll effect
  const [top, setTop] = useState(100); // Initially below navbar

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setTop(Math.max(0, 100 - scrollY)); // Move up but stop at 0px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    // Filter by price range
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (JSON.stringify(filteredProducts) !== JSON.stringify(sortedProducts)) {
      setSortedProducts(filteredProducts);
    }
  }, [selectedCategories, selectedGenders, priceRange, products]);

  // Function to calculate percentage position for visual slider track
  const getPercentage = (value: number) => {
    return ((value - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  };

  // Handle minimum price change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minValue = parseInt(e.target.value);
    const maxValue = priceRange[1];
    
    // Ensure min value doesn't exceed max value minus gap
    if (minValue + RANGE_GAP <= maxValue) {
      setPriceRange([minValue, maxValue]);
      if (minRangeRef.current) {
        minRangeRef.current.value = minValue.toString();
      }
    } else {
      // If min is too close to max, keep a gap
      setPriceRange([maxValue - RANGE_GAP, maxValue]);
      if (minRangeRef.current) {
        minRangeRef.current.value = (maxValue - RANGE_GAP).toString();
      }
    }
  };

  // Handle maximum price change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minValue = priceRange[0];
    const maxValue = parseInt(e.target.value);
    
    // Ensure max value doesn't go below min value plus gap
    if (maxValue >= minValue + RANGE_GAP) {
      setPriceRange([minValue, maxValue]);
      if (maxRangeRef.current) {
        maxRangeRef.current.value = maxValue.toString();
      }
    } else {
      // If max is too close to min, keep a gap
      setPriceRange([minValue, minValue + RANGE_GAP]);
      if (maxRangeRef.current) {
        maxRangeRef.current.value = (minValue + RANGE_GAP).toString();
      }
    }
  };

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

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedGenders([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    
    // Reset range input values
    if (minRangeRef.current) minRangeRef.current.value = MIN_PRICE.toString();
    if (maxRangeRef.current) maxRangeRef.current.value = MAX_PRICE.toString();
  };

  const categories = [...new Set(products.map((p) => p.category.name))];
  const genders = [...new Set(products.map((p) => p.gender))];

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error fetching products: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.sidebar} style={{ top: `${top}px`, transition: "top 0.1s ease-in-out" }}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarLogo}>CARTIFY</h2>
            <p className={styles.sidebarSubtitle}>Refine your style</p>
          </div>
          
          <div className={styles.filterSection}>
            <h3 className={styles.sidebarTitle}>
              <span className={styles.titleIcon}>◆</span> CATEGORIES
            </h3>
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
          </div>

          <div className={styles.divider}></div>

          <div className={styles.filterSection}>
            <h3 className={styles.sidebarTitle}>
              <span className={styles.titleIcon}>◆</span> GENDER
            </h3>
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

          <div className={styles.divider}></div>

          <div className={styles.filterSection}>
            <h3 className={styles.sidebarTitle}>
              <span className={styles.titleIcon}>◆</span> PRICE RANGE
            </h3>
            <div className={styles.priceRangeContainer}>
              <div className={styles.priceInputs}>
                <div>
                  <label className={styles.priceLabel}>Min: Rs. {priceRange[0]}</label>
                </div>
                <div>
                  <label className={styles.priceLabel}>Max: Rs. {priceRange[1]}</label>
                </div>
              </div>
              
              {/* Dual range slider implementation */}
              <div className={styles.rangeSliderContainer}>
                {/* Progress bar that shows the selected range */}
                <div 
                  className={styles.priceTrack}
                  style={{
                    left: `${getPercentage(priceRange[0])}%`,
                    width: `${getPercentage(priceRange[1]) - getPercentage(priceRange[0])}%`
                  }}
                ></div>
                
                {/* Minimum value slider */}
                <input
                  ref={minRangeRef}
                  type="range"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  value={priceRange[0]}
                  onChange={handleMinChange}
                  className={`${styles.rangeSlider} ${styles.minRangeSlider}`}
                />
                
                {/* Maximum value slider */}
                <input
                  ref={maxRangeRef}
                  type="range"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  value={priceRange[1]}
                  onChange={handleMaxChange}
                  className={`${styles.rangeSlider} ${styles.maxRangeSlider}`}
                />
              </div>
              
              <div className={styles.priceRange}>
                <span>Rs. {MIN_PRICE}</span>
                <span>Rs. {MAX_PRICE}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.sidebarFooter}>
            <button 
              className={styles.resetButton}
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className={styles.content}>
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
                    )}&price=${product.price}&image1=${encodeURIComponent(
                      product.image1
                    )}&image2=${encodeURIComponent(product.image2)}`
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
    </>
  );
};

export default ProductsPage;