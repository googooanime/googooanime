import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Hook for navigation
  const { addToCart } = useCart();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`); // Navigate to the ProductPage
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking "Add to Cart"
    addToCart(product);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={handleProductClick} // Open ProductPage when clicking the card
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500 mt-1">${product.price}</p>
        <button
          onClick={handleAddToCart} // Only handle "Add to Cart" without navigation
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
