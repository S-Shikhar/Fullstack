const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const bodyParser = require("body-parser");
const { isAuthenticated, isAdmin } = require("./src/middlewares/auth");

const User = require("./src/models/User");
const Product = require("./src/models/product");
const Order = require("./src/models/order");

const app = express();
const PORT = 3000;

// Middleware
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates"));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// JWT Secret Key
const JWT_SECRET = "your_jwt_secret_key";

// Routes
// 1. Home Page
app.get("/", (req, res) => {
  res.render("index");
});

// 2. User Registration
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role: "user" });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

// 3. User Login
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token);
      if (user.role === "admin") return res.redirect("/admin/dashboard");
      return res.redirect("/shop");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

// 4. Shop Page (for users)
app.get("/shop", isAuthenticated, async (req, res) => {
  try {
    const products = await Product.find();
    res.render("shop", { products });
  } catch (error) {
    res.status(500).send("Error loading shop");
  }
});

// 5. Cart Management (Session-based)
let cart = [];

app.post("/cart/add", isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);

  if (product) {
    cart.push({ product, quantity: parseInt(quantity) });
    res.redirect("/cart");
  } else {
    res.status(404).send("Product not found");
  }
});

app.get("/cart", isAuthenticated, (req, res) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  res.render("cart", { cart, totalPrice });
});

// 6. Place Order
app.post("/order", isAuthenticated, async (req, res) => {
  try {
    const order = new Order({
      user_id: req.user.id,
      products: cart.map((item) => ({
        product_id: item.product._id,
        quantity: item.quantity,
      })),
      total_price: cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
      created_at: new Date(),
    });

    await order.save();
    cart = [];
    res.redirect("/shop");
  } catch (error) {
    res.status(500).send("Error placing order");
  }
});

// 7. Admin Dashboard
app.get("/admin/dashboard", isAuthenticated, isAdmin, (req, res) => {
  res.render("admin/dashboard");
});

// 8. Manage Products (Admin)
app.get("/admin/products", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.render("admin/manageProducts", { products });
  } catch (error) {
    res.status(500).send("Error loading products");
  }
});

app.post("/admin/add-product", isAuthenticated, isAdmin, async (req, res) => {
  const { name, description, price, stock } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      stock,
      created_at: new Date(),
    });
    await product.save();
    res.redirect("/admin/products");
  } catch (error) {
    res.status(500).send("Error adding product");
  }
});

app.post("/admin/delete-product", isAuthenticated, isAdmin, async (req, res) => {
  const { product_id } = req.body;

  try {
    await Product.findByIdAndDelete(product_id);
    res.redirect("/admin/products");
  } catch (error) {
    res.status(500).send("Error deleting product");
  }
});

// 9. Admin Orders Management
app.get("/admin/orders", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user_id").populate("products.product_id");
    res.render("admin/manageOrders", { orders });
  } catch (error) {
    res.status(500).send("Error loading orders");
  }
});

// Server Start
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
