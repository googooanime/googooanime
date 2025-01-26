import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Import the useCart hook

const Navbar = () => {
  const { cartCount } = useCart(); // Get cartCount from the context

  return (
    <nav className="bg-gray-800 text-white fixed w-full z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link to="/" className="hover:text-gray-300">
              Shop
            </Link>
          </div>

          {/* Cart Icon */}
          <div>
            <Link to="/cart" className="relative focus:outline-none" aria-label="View Cart">
              <FaShoppingCart className="text-2xl hover:text-gray-300" />
              <span className="absolute -top-1 -right-2 bg-red-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
