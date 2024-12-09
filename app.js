const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use process.env.PORT, and fallback to 3000 locally

// Database connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/trainer", require("./routes/trainerRoutes"));
app.use("/api/trainee", require("./routes/traineeRoutes"));

// Error handling middleware
app.use(require("./middlewares/errorHandler"));

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
