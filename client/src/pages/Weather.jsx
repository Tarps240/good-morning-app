import { useEffect, useState } from "react";
import WeatherMain from "./WeatherMain";
import WeatherForecastCondensed from "./WeatherForecastCondensed";
import FullForecast from "./FullForecast";
import axios from "axios";

function Weather() {
    // State for weather data.
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

    // Show/hide full forecast overlay.
    const [showFullForecast, setShowFullForecast] = useState(false);

    // Some states for the location data.
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // RapidAPI keys and OpenWeather key
    const rapidApiKey = "dba77c7505msh99db1ecf0a317c4p1aafb8jsn7130520b43bc";
    const openWeatherKey = "dbc147afcf06b46c07ea546c0563cda2"; 

    useEffect(() => {
        // On mount, try to detect the user location by IP
        getUserLocationByIP();
    }, []);

    // Fetch user location via IP
    const getUserLocationByIP = async () => {
        setLoading(true);
        try {
          // Example endpoint, "ip-geo-location" from RapidAPI
          const response = await axios.get("https://ip-geo-location.p.rapidapi.com/ip/check", {
            params: { format: "json" },
            headers: {
                "X-RapidAPI-Key": rapidApiKey,
                "X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com",
            },
          });
          const data = response.data;
          // data should contain city, lat, and long.
          const userCity = data.city?.name || "Nashville"; // fallback
          setCity(userCity);
          // Then fetch the weather for that city
          fetchWeatherByCity(userCity);
        } catch (err) {
            console.error("Error fetching user IP location:", err);
        }
        setLoading(false);
    };

    // If the user types a city, we can search suggestions from GeoDB.
    const handleSearchCity = async (e) => {
        e.preventDefault();
        if (!city) return;
        setLoading(true);
        try {
            const geoRes = await axios.get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
                params: { namePrefix: city, limit: 5 },
                headers: {
                    "X-RapidAPI-Key": rapidApiKey,
                    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                },
            });
            setSearchResults(geoRes.data.data); // An array of city objects
        } catch (err) {
            console.error("GeoDB city search error:", err);
        }
        setLoading(false);
    };

    // If user picks a city from the suggestions
    const handleSelectCity = (selectedCity) => {
        setSearchResults([]);
        // Store lat/lon or just the city name:
        setCity(selectedCity.city);
        // Now get weather for that city name (or lat/lon).
        fetchWeatherByCity(selectedCity.city);
    };

    // Call OpenWeatherMap
    const fetchWeatherByCity = async (cityName) => {
        setLoading(true);
        try {
            // Current weather
            const currentRes = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
              params: {
                q: cityName,
                appid: openWeatherKey,
                units: "imperial",
              },  
            });
            setCurrentWeather(currentRes.data);

            // 5-day forecast
            const forecastRes = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
              params: {
                q: cityName,
                appid: openWeatherKey,
                units: "imperial",
              },  
            });
            setForecast(forecastRes.data.list);
        } catch (err) {
            console.error("OpenWeather error:", err);
        }
        setLoading(false);
    };

    const handleOpenForecast = () => {
        setShowFullForecast(true);
    };

    const handleCloseForecast = () => {
        setShowFullForecast(false);
    };

    if (loading) {
        return <div className="weather-page">Loading weather data for {city}...</div>;
    }

    return (
        <div className="weather-page">
            {/* City Search UI */}
            <h2>Weather</h2>
            <form onSubmit={handleSearchCity} className="city-search-form">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search city..."
                />
                <button type="submit">Search</button>
            </form>

            {/* Show search results from GeoDB */}
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((res) => (
                        <div 
                            key={res.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelectCity(res)}
                        >
                            {res.city}, {res.region}, {res.country}
                        </div>
                    ))}
                </div>
            )}

            {/* If no data or error, show a fallback */}
            {(!currentWeather || forecast.length === 0) && !loading && <p>No weather data found.</p>}

            {currentWeather && (
              <>
                <WeatherMain currentWeather={currentWeather} />
                <WeatherForecastCondensed forecast={forecast} onOpen={handleOpenForecast} />

                {/* Full forecast overlay */}
                {showFullForecast && (
                    <FullForecast forecast={forecast} onClose={handleCloseForecast} />
                )}
              </>
            )}
        </div>
    );
}

export default Weather;