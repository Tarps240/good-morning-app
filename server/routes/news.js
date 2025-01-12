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
      const apiKey = "pub_628158af2f38dfd07b4300eab516c16e55b82&q=latest&language=en";

      const response = await axios.get("https://newsdata.io/api/1/news?apikey=pub_628158af2f38dfd07b4300eab516c16e55b82&q=latest&language=en");
      
      // response.data.articles is the typical structure
      
      res.json(response.data);
    } catch (err) {
        console.error("News route error:", err);
        res.status(500).json({ error: "Server error" });
    }
});
module.exports = router;
