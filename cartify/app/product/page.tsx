'use client';
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { gql } from 'graphql-request';
import { useFetchGraphQL } from "@/hooks";

const PRODUCTS_QUERY = gql`
  query {
    products {
      id
      name
      description
      price
      image
    }
  }
`;

const ProductsPage = () => {
  const { data, loading, error } = useFetchGraphQL<{ products: { id: number, name: string, description: string, price: number, image: string }[] }>(PRODUCTS_QUERY);
  const products = data?.products || [];
  const [sortedProducts, setSortedProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  useEffect(() => {
    let filteredProducts = products;

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
    }

    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand));
    }

    if (selectedPrices.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.price;
        return selectedPrices.some(priceRange => {
          const [min, max] = priceRange.split(' - ').map(p => parseInt(p.replace('Rs. ', '').replace('+', '')));
          return price >= min && (max ? price <= max : true);
        });
      });
    }

    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedColors.includes(product.color));
    }

    setSortedProducts(filteredProducts);
  }, [selectedCategories, selectedBrands, selectedPrices, selectedColors, products]);

  const handleFilterChange = (filterType, value) => {
    const updateFilter = (selectedFilters, setSelectedFilters) => {
      if (selectedFilters.includes(value)) {
        setSelectedFilters(selectedFilters.filter(filter => filter !== value));
      } else {
        setSelectedFilters([...selectedFilters, value]);
      }
    };

    switch (filterType) {
      case 'category':
        updateFilter(selectedCategories, setSelectedCategories);
        break;
      case 'brand':
        updateFilter(selectedBrands, setSelectedBrands);
        break;
      case 'price':
        updateFilter(selectedPrices, setSelectedPrices);
        break;
      case 'color':
        updateFilter(selectedColors, setSelectedColors);
        break;
      default:
        break;
    }
  };

  const categories = ['Tahrits', 'Lounge Tahrits', 'Casual Tahrits', 'Formal Tahrits'];
  const brands = ['Roadster', 'Fishkens', 'Greybong', 'H&M', 'Zara', 'Tommy Hilfiger', 'U.S. Polo Assn.', 'Levis'];
  const prices = ['Rs. 369 - Rs. 1000', 'Rs. 1000 - Rs. 2000', 'Rs. 2000 - Rs. 5000', 'Rs. 5000+'];
  const colors = ['Black', 'White', 'Blue', 'Navy Blue', 'Green', 'Grey', 'Red', 'Yellow'];

  const sortProducts = (order) => {
    const sorted = [...sortedProducts].sort((a, b) => {
      if (order === 'highToLow') {
        return b.price - a.price;
      } else if (order === 'lowToHigh') {
        return a.price - b.price;
      }
      return 0;
    });
    setSortedProducts(sorted);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching products: {error.message}</p>;

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center" style={{ paddingTop: '80px' }}>
        <div className="w-[90%]">
          <div className="flex">
            {/* Filters Section */}
            <div className="w-1/6 p-4 rounded-lg bg-opacity-0 sticky top-6 h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              <h3 className="font-medium text-md mb-4">CATEGORIES</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        onChange={() => handleFilterChange('category', category)}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <h3 className="font-medium text-md mt-6 mb-4">BRAND</h3>
              <ul className="space-y-2">
                {brands.map((brand, index) => (
                  <li key={index}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        onChange={() => handleFilterChange('brand', brand)}
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <h3 className="font-medium text-md mt-6 mb-4">PRICE</h3>
              <ul className="space-y-2">
                {prices.map((price, index) => (
                  <li key={index}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        onChange={() => handleFilterChange('price', price)}
                      />
                      <span className="text-sm">{price}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <h3 className="font-medium text-md mt-6 mb-4">COLOR</h3>
              <ul className="space-y-2">
                {colors.map((color, index) => (
                  <li key={index}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        onChange={() => handleFilterChange('color', color)}
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Grid */}
            <div className="w-5/6 ml-6">
              {/* Sort Section */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Men's Collection</h2>
                <div>
                  <label className="mr-4">Sort by:</label>
                  <select
                    onChange={(e) => sortProducts(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="highToLow">Price: High to Low</option>
                    <option value="lowToHigh">Price: Low to High</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-5 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white p-4 rounded-lg">
                    <img
                      src={`http://localhost:8000/media/${product.image}`}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <h3 className="text-md font-semibold mt-2">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="mt-2">
                      <span className="text-md font-bold">Rs. {product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;