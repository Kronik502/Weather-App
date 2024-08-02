import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherslice';
import './WeatherDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../App.css'
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

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case '01d':
      case '01n':
        return faSun;
      case '02d':
      case '02n':
        return faCloud;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return faCloudRain;
      case '13d':
      case '13n':
        return faSnowflake;
      default:
        return faCloud;
    }
  };

  return (
    <div className='current'>
      {weather && (
        <div className="weather-display">
          <h2>Current Weather</h2>
          <FontAwesomeIcon icon={getWeatherIcon(weather.icon)} className="weather-icon" />
          <p>Date: {weather.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>Temperature: {weather.temperature}°C</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;
