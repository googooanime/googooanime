import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState([]); // State for fetched products
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch products when the app loads
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Ensure loading stops even if there's an error
      }
    };

    fetchProducts();
  }, []); // Run only once when the component mounts

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {loading ? (
                    <p>Loading products...</p> // Show loading state
                  ) : (
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  )}
                </div>
              </>
            }
          />
          {/* Other Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/product/:id"
            element={<ProductPage products={products} />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
