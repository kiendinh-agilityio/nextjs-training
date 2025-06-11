"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: Number(newProduct.price),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      setProducts([...products, data]);
      setNewProduct({ name: "", price: "" });
    } catch (err) {
      setError("Failed to add product");
    }
  };

  // Delete product
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Refresh the product list after deletion
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  const handleDeleteClick = (product: Product) => () => {
    handleDelete(product.id);
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="flex-1 p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="flex-1 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Products List */}
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50"
          >
            <Link
              href={`/products/${product.id}`}
              className="flex-1 hover:text-blue-500"
            >
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
            <div className="flex gap-2">
              <Link
                href={`/products/${product.id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={handleDeleteClick(product)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
