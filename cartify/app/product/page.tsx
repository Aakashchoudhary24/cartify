'use client';
import React, { useState } from 'react';
import Navbar from "../components/Navbar";

const ProductsPage = () => {
  // Mock data for products (replace with API data later)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'United Colors of Benetton',
      description: 'High of Printed Tahrit',
      price: 714,
      image: '/images/h1.png',
    },
    {
      id: 2,
      name: 'DAMENSCH',
      description: 'Pure Cotton Lounge Tahrit',
      price: 1399,
      image: '/images/h2.png',
    },
    {
      id: 3,
      name: 'Mr Bowerbird',
      description: 'Solid Sweater Pure Cotton',
      price: 939,
      image: '/images/h3.png',
    },
    {
      id: 4,
      name: 'Levis',
      description: 'Solid Lounge Tahrit',
      price: 336,
      image: '/images/Levis.jpeg',
    },
    {
      id: 5,
      name: 'ADDO',
      description: 'Pure Cotton Regular Tahrit',
      price: 939,
      image: '/images/h1.png',
    },
    {
      id: 6,
      name: 'United Colors of Benetton',
      description: 'High of Printed Tahrit',
      price: 714,
      image: '/images/h1.png',
    },
    {
      id: 7,
      name: 'DAMENSCH',
      description: 'Pure Cotton Lounge Tahrit',
      price: 1399,
      image: '/images/h2.png',
    },
    {
      id: 8,
      name: 'Mr Bowerbird',
      description: 'Solid Sweater Pure Cotton',
      price: 939,
      image: '/images/h3.png',
    },
    {
      id: 9,
      name: 'Levis',
      description: 'Solid Lounge Tahrit',
      price: 336,
      image: '/images/Levis.jpeg',
    },
    {
      id: 10,
      name: 'ADDO',
      description: 'Pure Cotton Regular Tahrit',
      price: 939,
      image: '/images/h1.png',
    },
    {
      id: 111,
      name: 'United Colors of Benetton',
      description: 'High of Printed Tahrit',
      price: 714,
      image: '/images/h1.png',
    },
    {
      id: 21,
      name: 'DAMENSCH',
      description: 'Pure Cotton Lounge Tahrit',
      price: 1399,
      image: '/images/h2.png',
    },
    {
      id: 31,
      name: 'Mr Bowerbird',
      description: 'Solid Sweater Pure Cotton',
      price: 939,
      image: '/images/h3.png',
    },
    {
      id: 41,
      name: 'Levis',
      description: 'Solid Lounge Tahrit',
      price: 336,
      image: '/images/Levis.jpeg',
    },
    {
      id: 51,
      name: 'ADDO',
      description: 'Pure Cotton Regular Tahrit',
      price: 939,
      image: '/images/h1.png',
    },
    {
      id: 11,
      name: 'United Colors of Benetton',
      description: 'High of Printed Tahrit',
      price: 714,
      image: '/images/h1.png',
    },
    {
      id: 12,
      name: 'DAMENSCH',
      description: 'Pure Cotton Lounge Tahrit',
      price: 1399,
      image: '/images/h2.png',
    },
    {
      id: 13,
      name: 'Mr Bowerbird',
      description: 'Solid Sweater Pure Cotton',
      price: 939,
      image: '/images/h3.png',
    },
    {
      id: 14,
      name: 'Levis',
      description: 'Solid Lounge Tahrit',
      price: 336,
      image: '/images/Levis.jpeg',
    },
    {
      id: 15,
      name: 'ADDO',
      description: 'Pure Cotton Regular Tahrit',
      price: 939,
      image: '/images/h1.png',
    },
    
    // Add more products here
  ]);

  // Updated filter options
  const categories = ['Tahrits', 'Lounge Tahrits', 'Casual Tahrits', 'Formal Tahrits'];
  const brands = ['Roadster', 'Fishkens', 'Greybong', 'H&M', 'Zara', 'Tommy Hilfiger', 'U.S. Polo Assn.', 'Levis'];
  const prices = ['Rs. 369 - Rs. 1000', 'Rs. 1000 - Rs. 2000', 'Rs. 2000 - Rs. 5000', 'Rs. 5000+'];
  const colors = ['Black', 'White', 'Blue', 'Navy Blue', 'Green', 'Grey', 'Red', 'Yellow'];

  // Sort products
  const sortProducts = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === 'highToLow') {
        return b.price - a.price;
      } else if (order === 'lowToHigh') {
        return a.price - b.price;
      }
      return 0;
    });
    setProducts(sortedProducts);
  };

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
                      <input type="checkbox" className="mr-2" />
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
                      <input type="checkbox" className="mr-2" />
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
                      <input type="checkbox" className="mr-2" />
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
                      <input type="checkbox" className="mr-2" />
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
                {products.map((product) => (
                  <div key={product.id} className="bg-white p-4 rounded-lg">
                    <img
                      src={product.image}
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