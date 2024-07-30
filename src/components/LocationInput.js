import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather, fetchForecast } from '../redux/weatherslice';
import './LocationInput.css'
import '../App.css';
function LocationInput() {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      dispatch(fetchWeather(location));
      dispatch(fetchForecast(location)); // Fetch forecast for the entered location
      setLocation('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
}

export default LocationInput;
