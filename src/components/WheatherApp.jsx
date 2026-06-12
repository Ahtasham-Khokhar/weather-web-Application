import React, { useState } from 'react';

import { 
  WiDaySunny, 
  WiCloud, 
  WiRain, 
  WiSnow, 
  WiHumidity, 
  WiStrongWind, 
  WiDayCloudy,
} from 'react-icons/wi';
import { FiSearch } from 'react-icons/fi';
import './WheatherApp.css';

const API_KEY = "b63ed151ee234c52a93154657240805";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');

  const getWeatherIcon = (condition) => {
    const conditions = {
      'Sunny': <WiDaySunny size={120} />,
      'Clear': <WiDaySunny size={120} />,
      'Partly cloudy': <WiDayCloudy size={120} />,
      'Cloudy': <WiCloud size={120} />,
      'Overcast': <WiCloud size={120} />,
      'Rain': <WiRain size={120} />,
      'Drizzle': <WiRain size={120} />,
      'Snow': <WiSnow size={120} />,
      'default': <WiDayCloudy size={120} />
    };
    return conditions[condition] || conditions.default;
  };

  const searchWeather = async (cityInput) => {
    if (!cityInput.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput.trim()}&units=metric&aqi=yes`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setCity('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchWeather(city);
  };

  return (
    <div className="weather-app">
      <div className="glass-card">
        {/* Header */}
        <div className="header">
          <h1 className="title">🌤️ Weather</h1>
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-container">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="search-input"
              />
              <button 
                type="submit" 
                className="search-btn"
                disabled={loading}
              >
                {loading ? '🔄' : <FiSearch size={20} />}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {/* Weather Display */}
        {weatherData ? (
          <>
            <div className="weather-main">
              <div className="weather-icon">
                {getWeatherIcon(weatherData.current.condition.text)}
              </div>
              <div className="temperature-container">
                <div className="temperature">
                  {Math.round(weatherData.current.temp_c)}°C
                </div>
                <div className="feels-like">
                  Feels like {Math.round(weatherData.current.feelslike_c)}°C
                </div>
              </div>
            </div>

            <div className="location">
              {weatherData.location.name}, {weatherData.location.country}
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <WiHumidity size={24} />
                <div>
                  <div className="detail-value">{weatherData.current.humidity}%</div>
                  <div className="detail-label">Humidity</div>
                </div>
              </div>
              <div className="detail-item">
                <WiStrongWind size={24} />
                <div>
                  <div className="detail-value">{weatherData.current.wind_kph} km/h</div>
                  <div className="detail-label">Wind Speed</div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-value">{weatherData.current.precip_mm} mm</div>
                <div className="detail-label">Precipitation</div>
              </div>
            </div>
          </>
        ) : (
          <div className="default-weather">
            <WiDayCloudy size={120} />
            <p>Search for a city to see weather</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;