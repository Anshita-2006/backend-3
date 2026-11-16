require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Connect to MongoDB
connectDB();

// Built-in middleware to read JSON request bodies
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory Management API is running",
    endpoints: {
      products: "/api/products",
      lowStockReport: "/api/products/reports/low-stock",
      categorySummary: "/api/products/reports/category-summary"
    }
  });
});

// API routes
app.use("/api/products", productRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// Centralized error handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});