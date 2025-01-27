import React from "react";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item, removeFromCart, increaseQuantity, decreaseQuantity }) => {
  const navigate = useNavigate(); // Initialize useNavigate inside the component

  const handleProductClick = () => {
    navigate(`/product/${item.id}`); // Navigate to the product page with the item's ID
  };

  return (
    <div
      className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-4"
      onClick={handleProductClick}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div>
        <h3 className="text-lg font-medium">{item.name}</h3>
        <p>${item.price}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent click
              decreaseQuantity(item.id);
            }}
            className="text-gray-500 hover:text-gray-700 px-2"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent click
              increaseQuantity(item.id);
            }}
            className="text-gray-500 hover:text-gray-700 px-2"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click
          removeFromCart(item.id);
        }}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
