const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Checkout Schema
const checkoutSchema = new mongoose.Schema({
  customerDetails: {
    name: String,
    email: String,
    phone: String,
    address: String,
    street: String,
    state: String,
    zip: String,
  },
  cartItems: Array,
  totalAmount: Number,
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

// Handle Checkout
app.post('/checkout', async (req, res) => {
  const { customerDetails, cartItems, totalAmount } = req.body;

  try {
    const newCheckout = new Checkout({
      customerDetails,
      cartItems,
      totalAmount,
    });

    await newCheckout.save();
    res.status(200).json({ success: true, message: 'Checkout successful!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error processing checkout' });
  }
});
// Define Product Schema
const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

// Create Product Model
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from DB
    res.json(products); // Send products as JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});