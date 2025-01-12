/**
 * - Sets up Express
 * - Connects to MongoDB Atlas
 * - Handles Auth routes
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path") //Path for file paths
require("dotenv").config();

// Routes
const authRoutes = require("./routes/auth");
const cryptoRoutes = require("./routes/crypto");
const weatherRoutes = require("./routes/weather");
const newsRoutes = require("./routes/news");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);

// New routes
app.use("/api/crypto", cryptoRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);

//Tell Express to serve all static files from React app client/dist folder
app.use(express.static(path.join(_dirname, '..', 'client', 'dist')));
//Catch-all route to serve index.html from any frontend route
app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, '..', 'client', 'dist', 'index.html'))
})
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});