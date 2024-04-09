import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';
function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '45e894cc0a42fb30531dbc9fe8aadca8'; // Replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric', // You can change units as needed
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="Container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
