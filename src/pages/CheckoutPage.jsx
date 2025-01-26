import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CheckoutPage = () => {
  const { cart, removeFromCart, resetCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    street: '',
    state: '',
    zip: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form field changes
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Combine form data and cart items
      const payload = {
        customerDetails: formData,
        cartItems: cart,
        totalAmount: calculateTotal(),
      };
  
      // Send data to the backend
      const response = await axios.post("http://localhost:5000/checkout", payload);
  
      if (response.data.success) {
        alert("Checkout successful! Thank you for your purchase.");
        navigate("/"); // Redirect user after checkout
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("Failed to process checkout. Please try again.");
    }
  };
  

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Checkout</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Billing Information Form */}
        <div className="lg:col-span-3 p-4 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold mb-4">Billing Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="street" className="block text-sm font-medium">
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
            </div>
            {cart.length > 0 ? (<button
              type="submit"
              className="bg-red-500 text-white font-semibold py-2 px-6 rounded hover:bg-red-600"
              onSubmit={handleSubmit}
            >
              Proceed to Pay
            </button>) : ( <h3 className="text-2xl-red">You can't proceed with empty cart!</h3>

            )}
           
          </form>
        </div>

        {/* Cart Items */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Your Products</h3>
          <div>
            {cart.length === 0 ? (
              <p className="text-center text-xl font-bold">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-500">Price: ${item.price}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm hover:text-red-700 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h4 className="text-lg font-semibold">Total: ${calculateTotal()}</h4>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
