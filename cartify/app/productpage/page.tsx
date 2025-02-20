'use client'
import { useState } from "react";

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    name: "Boa Fleece Jacket",
    price: 122.0,
    originalPrice: 129.0,
    discount: "6% Disc",
    rating: 4.9,
    reviews: "1.2K Reviews",
    description:
      "Introducing the Boa Fleece Winter Jacket, designed to keep you warm and comfortable during the coldest winter days. Crafted from high-quality fleece material, this jacket offers superior insulation and softness, making it the perfect choice for outdoor activities or everyday wear.",
    colors: [
      { name: "Black", hex: "black" },
      { name: "Blue", hex: "blue" },
      { name: "Green", hex: "green" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/jacket-black.png",
      "/jacket-blue.png",
      "/jacket-green.png",
      "/jacket-gray.png",
    ],
    recommendations: [
      {
        name: "Adidas x Jolt",
        price: 349.0,
        image: "/shoes.png",
      },
      {
        name: "P.S Cap",
        price: 49.0,
        image: "/cap.png",
      },
      {
        name: "OS Beanie",
        price: 20.0,
        image: "/beanie.png",
      },
      {
        name: "NH X Hekknox Folding Tote",
        price: 39.9,
        image: "/tote.png",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Images */}
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="flex mt-4 space-x-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-200 hover:border-black"
              />
            ))}
          </div>
        </div>

        {/* Right - Product Info */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-lg font-semibold text-gray-800">${product.price.toFixed(2)}</span>
            <span className="line-through text-gray-500">${product.originalPrice.toFixed(2)}</span>
            <span className="text-red-500">{product.discount}</span>
          </div>
          <div className="text-gray-600 mt-1">
            ⭐ {product.rating} ({product.reviews})
          </div>
          <p className="text-gray-700 mt-4">{product.description}</p>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Available Colors</h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.hex ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.hex)}
                ></button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex space-x-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size ? "bg-black text-white" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-3 bg-gray-200 text-black rounded-lg">Add to Cart</button>
            <button className="px-6 py-3 bg-black text-white rounded-lg">Checkout Now</button>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-12">
        <h2 className="text-xl font-bold">This item can be cool with this</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {product.recommendations.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-2 font-medium">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
