import React from "react";

const CartItem = ({ item, removeFromCart, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-4">
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
            onClick={() => decreaseQuantity(item.id)}
            className="text-gray-500 hover:text-gray-700 px-2"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={() => increaseQuantity(item.id)}
            className="text-gray-500 hover:text-gray-700 px-2"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
