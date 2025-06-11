"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = await response.json();
      setProduct(data);
      setEditedProduct({ name: data.name, price: data.price.toString() });
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Update product
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedProduct.name,
          price: Number(editedProduct.price),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      setProduct(updatedProduct);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update product");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  const handleBackProductPage = () => router.back();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditedProduct({ ...editedProduct, name: e.target.value });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditedProduct({ ...editedProduct, price: e.target.value });

  const handleStartEditing = () => setIsEditing(true);

  const handleCancelEditing = () => setIsEditing(false);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBackProductPage}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back to Products
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-2">Product Name</label>
              <input
                type="text"
                value={editedProduct.name}
                onChange={handleNameChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Price</label>
              <input
                type="number"
                value={editedProduct.price}
                onChange={handlePriceChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelEditing}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
            <button
              onClick={handleStartEditing}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
