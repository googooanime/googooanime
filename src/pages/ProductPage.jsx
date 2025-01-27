import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const ProductPage = ({ products }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1); // State to manage selected quantity

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold text-red-500">Product not found.</p>
      </div>
    );
  }

  // Adjust quantity within valid range
  const handleQuantityChange = (operation) => {
    setQuantity((prev) =>
      operation === "increment" ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); // Add the product with the specified quantity
    alert(`${product.name} (x${quantity}) added to cart!`);
  };

  return (
    <div className="container mx-auto p-4  max-w-4xl">
      <div className="flex m-5 flex-col  gap-6">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
          <p className="text-xl text-gray-500 mb-2">₹{product.price}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-lg font-medium">Quantity:</p>
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="w-8 h-8 bg-gray-200 text-lg font-bold rounded-lg hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increment")}
              className="w-8 h-8 bg-gray-200 text-lg font-bold rounded-lg hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-3xl font-semibold mb-4">Delivery Details 📦</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>Processing:</strong> 1-2 business days.
              </li>
              <li>
                <strong>Shipping:</strong> Standard & express options available.
              </li>
              <li>
                <strong>Delivery:</strong> 3-7 business days depending on
                location.
              </li>
              <li>
                <strong>Shipping Costs:</strong> Calculated at checkout.
              </li>
              <li>
                <strong>Tracking:</strong> You'll receive a tracking number once
                shipped.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-semibold mb-4">Return Policy 🔄</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>Return Window:</strong> 14 days from delivery.
              </li>
              <li>
                <strong>Condition:</strong> Unused, in original packaging.
              </li>
              <li>
                <strong>Refunds:</strong> Full refund after approval (7-10
                business days).
              </li>
              <li>
                <strong>Non-returnable:</strong> Personalized or perishable
                items.
              </li>
              <li>
                <strong>Return Shipping:</strong> Customer covers cost, unless
                defective.
              </li>
            </ul>
            <p className="mt-4">
              Need help? Contact us at{" "}
              <a href="mailto:support@example.com" className="text-blue-500">
                support@example.com
              </a>
              . We're here to assist!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
