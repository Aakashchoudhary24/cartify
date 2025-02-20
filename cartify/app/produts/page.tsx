'use client'
import React, { useState } from "react";

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
    <div className="flex p-6 w-4/5 mx-auto">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-4 border-r">
        <h3 className="font-semibold mb-4">Category</h3>
        <ul>
          <li><input type="checkbox" defaultChecked className="mr-2" /> Tops (37)</li>
          <li><input type="checkbox" className="mr-2" /> Jackets (22)</li>
          <li><input type="checkbox" className="mr-2" /> Sweaters (31)</li>
        </ul>
        <h3 className="font-semibold mt-4">Filters</h3>
        <ul>
          <li><input type="checkbox" defaultChecked className="mr-2" /> $20 - $100</li>
          <li><input type="checkbox" defaultChecked className="mr-2" /> Medium</li>
        </ul>
      </div>
      
      {/* Products Section */}
      <div className="w-3/4 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Showing {filteredProducts.length} results from total {productsData.length} for "tops"
          </h2>
          <select onChange={handleSortChange} value={sortOption} className="border p-2 rounded">
            <option value="popularity">Sort by Popularity</option>
            <option value="priceLowHigh">Sort by Price: Low to High</option>
            <option value="priceHighLow">Sort by Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.colors} Colors</p>
              <p className="font-bold text-lg">${product.price} {product.originalPrice && <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
