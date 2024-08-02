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

  // Group forecast items by day of the week
  const groupByDayAndTime = (forecastList) => {
    const dayAndTimeMap = new Map();

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString(undefined, { weekday: 'long' });
      const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

      if (!dayAndTimeMap.has(day)) {
        dayAndTimeMap.set(day, new Map());
      }

      const timeMap = dayAndTimeMap.get(day);
      if (!timeMap.has(time)) {
        timeMap.set(time, { ...item, time });
      }
    });

    const groupedForecast = {};
    dayAndTimeMap.forEach((timeMap, day) => {
      groupedForecast[day] = Array.from(timeMap.values());
    });

    return groupedForecast;
  };

  // Ensure forecast and forecast.list are defined before accessing
  const groupedForecast = forecast && forecast.list ? groupByDayAndTime(forecast.list) : {};

  // Get the next forecast item
  const nextForecastItem = forecast && forecast.list && forecast.list.length > 0 ? forecast.list[0] : null;

  return (
    <div className="forecast-wrapper">
      {forecast && forecast.city && (
        <>
          <div className="forecast-left">
            <h2 className="forecast-title">Weather Forecast for {forecast.city.name}</h2>
            <div className="forecast-container">
              {Object.keys(groupedForecast).map((day) => (
                <div key={day} className="forecast-day">
                  <h3>{day}</h3>
                  {groupedForecast[day].map((item) => (
                    <div key={item.dt} className="forecast-item">
                      <FontAwesomeIcon icon={getWeatherIcon(item.weather[0].icon)} className="weather-icon" />
                      <p>{item.time}</p>
                      <p>Date: {new Date(item.dt * 1000).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</p>
                      <p>Temperature: {item.main.temp}°C</p>
                      <p>Weather: {item.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {nextForecastItem && (
            <div className="forecast-right">
              <h2>Next Forecast</h2>
              <FontAwesomeIcon icon={getWeatherIcon(nextForecastItem.weather[0].icon)} className="weather-icon-large" />
              <p>{new Date(nextForecastItem.dt * 1000).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
              <p>{new Date(nextForecastItem.dt * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
              <p>Temperature: {nextForecastItem.main.temp}°C</p>
              <p>Weather: {nextForecastItem.weather[0].description}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Forecast;
