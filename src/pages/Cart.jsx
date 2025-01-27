import React from "react";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Use Cart context

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      
      {/* If cart is empty */}
      {cart.length === 0 ? (
        <p className="text-center text-xl font-bold">Your cart is empty.</p>
      ) : (
        // If cart has items
        cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        ))
      )}
      
      {/* Display Total */}
      {cart.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total: ${calculateTotal()}</h3>
        </div>
      )}

      {/* Checkout Button */}
      {cart.length > 0 && (
        <div className="flex justify-center mt-4">
          <button 
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
