// FullForecast.jsx

function FullForecast({ forecast, onClose }) {
    if (!forecast || forecast.length === 0) return null;

    return (
        <div className="full-forecast-overlay">
            <button className="back-btn" onClick={onClose}>Back</button>
            <h2>Full Forecast</h2>
            <div className="forecast-full-list">
                {forecast.map((period, index) => (
                    <div className="forecast-full-item" key={index}>
                        <span className="forecast-date">{period.dt_txt}</span>
                        <span className="forecast-temp">{Math.round(period.main.temp)}°</span>
                        <span className="forecast-desc">{period.weather[0].description}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FullForecast;