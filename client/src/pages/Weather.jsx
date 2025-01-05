import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Weather() {
    const [city, setCity] = useState("New York");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = () => {
        axiosInstance
            .get(`/api/weather?city=${city}`)
            .then((res) => {
                setWeatherData(res.data);
                setError("");
            })
            .catch((err) => {
                setError(err.response?.data?.error || "Error fetching weather");
                setWeatherData(null);
            });
    };

    return (
        <div className="weather-page">
            <h2>Weather</h2>
            <div className="weather-form">
                <label>City: </label>
                <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                />
                <button onClick={fetchWeather}>Get Weather</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {weatherData && (
                <div className="weather-details">
                    <h3>{weatherData.name}</h3>
                    <p>{weatherData.weather[0].description}</p>
                    <p>Temp: {weatherData.main.temp} °F</p>
                </div>
            )}
        </div>
    );
}

export default Weather;