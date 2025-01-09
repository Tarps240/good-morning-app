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
                sparkline: true
            }
        });
        res.json(response.data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
      res.status(500).json({ error: "Server error" });  
    }
});

// GET /api/crypto/:coinId
router.get("/:coinId", async (req, res) => {
    const { coinId } = req.params;
    try {
        // Single-coin details (with sparkline, no localization)
        const detailResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
            params: {
                localization: false,
                sparkline: true
            }
        });

        const historyResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
            params: {
                vs_currency: "usd",
                days: 30
            }
        });

        // Combine both responses
        const combinedData = {
            ...detailResponse.data,
            market_chart: historyResponse.data
        };

        res.json(combinedData);
    } catch (err) {
        console.error("Error fetching historical/detailed data:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;