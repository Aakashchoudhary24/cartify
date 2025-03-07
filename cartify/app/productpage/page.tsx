"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    name: "Boa Fleece Jacket",
    price: 122.0,
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
      "/images/h1.png",
      "/images/h1.png",
      "/images/h1.png",
      "/images/h1.png",
    ],
    recommendations: [
      { name: "Adidas x Jolt", price: 349.0, image: "/images/h1.png" },
      { name: "P.S Cap", price: 49.0, image: "/images/h1.png" },
      { name: "OS Beanie", price: 20.0, image: "/images/h1.png" },
      { name: "NH X Hekknox Folding Tote", price: 39.9, image: "/images/h1.png" },
    ],
  };

  return (
    <div className='bg-[#F4EEFF]'>
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6 pt-24 bg-[#F4EEFF]"> 
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto"> 
          {/* Product Images */}
          <div>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="flex gap-2 mt-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 hover:border-[#424874] transition-all"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#424874]">{product.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-[#424874]">Rs. {product.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⭐ {product.rating}</span>
              <span className="text-[#424874]">({product.reviews})</span>
            </div>
            <p className="text-[#424874]">{product.description}</p>

            {/* Color Options */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#424874]">Available Colors</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.hex ? "border-[#424874] scale-110" : "border-[#A6B1E1]"
                    } transition-transform`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.hex)}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#424874]">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size
                        ? "bg-[#424874] text-white scale-110"
                        : "bg-[#DCD6F7] text-[#424874] border-[#A6B1E1]"
                    } transition-all`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-[#424874] text-white rounded-lg hover:bg-[#A6B1E1] transition-all shadow-md">
                Add to Cart
              </button>
              <button className="flex-1 py-3 bg-[#DCD6F7] text-[#424874] rounded-lg hover:bg-[#A6B1E1] transition-all shadow-md">
                Checkout Now
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-12 w-full mx-auto border-t pt-10"> 
          <h2 className="text-2xl font-bold mb-6 text-[#424874]">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.recommendations.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg shadow-md hover:shadow-lg transition-all  border border-[#A6B1E1] hover:scale-105 transform duration-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-45 object-cover rounded-md mb-3 border-b pb-2" 
                />
                <h3 className="text-md font-semibold mt-2 text-[#424874]">{item.name}</h3>
                <p className="text-sm text-[#424874]">{item.name}</p> 
                <div className="mt-2">
                  <span className="text-md font-bold text-[#424874]">Rs. {item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}