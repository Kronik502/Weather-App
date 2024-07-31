import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecast } from '../redux/weatherslice';
import './Forecast.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

function Forecast() {
  const dispatch = useDispatch();
  const forecast = useSelector((state) => state.weather.forecast);
  const weatherStatus = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    dispatch(fetchForecast('Tembisa')); // Default location
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
    <div>
      {forecast && (
        <div>
          <h2 className="forecast-title">Weather Forecast for {forecast.city.name}</h2>
          <div className="forecast-container">
            {forecast.list.map((item) => (
              <div key={item.dt} className="forecast-item">
                <FontAwesomeIcon icon={getWeatherIcon(item.weather[0].icon)} className="weather-icon" />
                <p>{new Date(item.dt * 1000).toLocaleString()}</p>
                <p>Temperature: {item.main.temp}°C</p>
                <p>Weather: {item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Forecast;
