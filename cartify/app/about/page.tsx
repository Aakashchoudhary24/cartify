"use client"; // Required for fetching data in the client-side

import { useState, useEffect } from "react";
import { request, gql } from 'graphql-request';

// Define TypeScript types
interface Category {
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  createdAt: string;
  category: Category;
}

interface ProductsResponse {
  products: Product[];
}

const PRODUCTS_QUERY = gql`
  query {
    products {
      id
      name
      description
      price
      stock
      image
      createdAt
      category {
        name
      }
    }
  }
`;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://127.0.0.1:8000/graphql/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: PRODUCTS_QUERY }),
        });
        
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching products: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow-md">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.category.name}</p>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">${product.price}</span>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
