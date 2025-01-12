
function WeatherMain({ currentWeather }) {
    if (!currentWeather) return null;

    const { name, main, weather } = currentWeather;
    const temp = main?.temp;
    const description = weather?.[0]?.description;
    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

    return (
        <div className="weather-main">
            <h1 className="weather-temp">{Math.round(temp)}°</h1>
            <p className="weather-desc">{description}</p>
            <p className="weather-location">{name}</p>
            <p className="weather-time">{timeNow}</p>
        </div>
    );
}

export default WeatherMain