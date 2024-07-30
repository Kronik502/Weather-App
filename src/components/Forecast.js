import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecast } from '../redux/weatherslice';

function Forecast() {
  const dispatch = useDispatch();
  const forecast = useSelector((state) => state.weather.forecast);
  const weatherStatus = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    dispatch(fetchForecast('London')); // Default location
  }, [dispatch]);

  if (weatherStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (weatherStatus === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      {forecast && (
        <div>
          <h2>Weather Forecast for {forecast.city.name}</h2>
          {forecast.list.map((item) => (
            <div key={item.dt} className="forecast-item">
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
              <p>{new Date(item.dt * 1000).toLocaleString()}</p>
              <p>Temperature: {item.main.temp}°C</p>
              <p>Weather: {item.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forecast;
