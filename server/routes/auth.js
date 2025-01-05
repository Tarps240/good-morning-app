/**
 * server/routes/auth.js
 * - Registration & Login endpoints
 */

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create user
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Server error" });
      }
});

// POST /api/auth/Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Ivalid credentials" });
        }

        // Create JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;