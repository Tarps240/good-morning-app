// WeatherForecastCondensed.jsx

function WeatherForecastCondensed({ forecast, onOpen }) {
    if (!forecast || forecast.length === 0) return null;

    // For simplicity, show the next 5 distinct days or periods
    const shortList = forecast.slice(0, 5); // just the first 5 data points.

    return (
        <div className="weather-forecast-condensed" onClick={onOpen}>
            <h3>This Week</h3>
            <div className="forecast-list">
                {shortList.map((period, idx) => (
                  <div className="forecast-item" key={idx}>
                    <span className="forecast-day">{period.dt_txt}</span>
                    <span className="forecast-temp">{Math.round(period.main.temp)}°</span>
                    <span className="forecast-desc">{period.weather[0].description}</span>
                  </div>  
                ))}
            </div>
        </div>
    );
}

export default WeatherForecastCondensed;