/**
 * server/routes/news.js
 */
const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/news
router.get("/", async (req, res) => {
    try {
      // In production, store NEWS_API_KEY in .env
      const apiKey = process.env.NEWS_API_KEY || "6246e3c6e00342c8a6127cf98f3e907e";
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
            country: "us",
            apiKey: apiKey
        }
      });
      // response.data.articles is the typical structure
      res.json(response.data);
    } catch (err) {
        console.error("News route error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;