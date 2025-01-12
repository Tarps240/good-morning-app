/**
 * server/routes/news.js
 */
const express = require("express");
const router = express.Router();
const axios = require("axios");

const NEWS_API_KEY = process.env.NEWS_API_KEY || "pub_651405191d859b26916ec184f8cce7fbf66fd";

/**
 * Local news
 * Suppose "country=us" or a specific location. Adjust accordingly.
 */
router.get("/local", async (req, res) => {
  try {
    // local = country=us, category=top
    const response = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: NEWS_API_KEY,
        country: "us",
        language: "en",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("Local news route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Trending news
 * Possibly "q=trending" or rely on top headlines.
 * or define any query that you consider "trending."
 */
router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: NEWS_API_KEY,
        q: "trending",
        language: "en",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("Trending news route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Search by keyword
 */
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query || "latest";
    const response = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: NEWS_API_KEY,
        q: query,
        language: "en",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("News search route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;