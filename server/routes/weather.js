/**
 * server/routes/weather.js
 */
const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/weather?city=London
router.get("/", async (req, res) => {
    try {
        const city = req.query.city || "New York";
        // In production, store the API key in process.env.WEATHER_API_KEY
        const apiKey = process.env.WEATHER_API_KEY || "RASZBZ5Q7WYDQXLRL9DSRJWPZ";

        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: city,
                appid: apiKey,
                units: "imperial" // or "metric" if you prefer Celsius
            }
        });
        res.json(response.data);
    }   catch (err) {
        console.error("Weather route error:", err);
        res.status(500).json({ error: "Server error" });
    } 
});

module.exports = router;