/**
 * server/routes/crypto.js
 */
const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/crypto
router.get("/", async (req, res) => {
    try {
        // Example: Get top 10 coins by market cap from CoinGeko
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: 10,
                page: 1,
                sparkline: false
            }
        });
        res.json(response.data);
    } catch (err) {
      console.error("Crypto route error:", err);
      res.status(500).json({ error: "Server error" });  
    }
});

module.exports = router;