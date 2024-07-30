import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherslice';

function WeatherDisplay() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.currentWeather);
  const weatherStatus = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    dispatch(fetchWeather('Johannesburg')); // Default location
  }, [dispatch]);

  if (weatherStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (weatherStatus === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      {weather && (
        <div className="weather-display">
          <h2>Current Weather</h2>
          <i className={`wi ${weather.icon}`}></i> {/* Display the icon */}
          <p>Date: {weather.date.toLocaleString()}</p>
          <p>Temperature: {weather.temperature}°C</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;
