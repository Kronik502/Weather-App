import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import LocationInput from './components/LocationInput';
import Forecast from './components/Forecast';
import WeatherAlerts from './components/WeatherAlerts';
import WeatherDisplay from './components/WeatherDisplay';
import OfflineMode from './components/OfflineMode';
import Settings from './components/Settings';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>The Weather Kronikles</h1>
        <LocationInput />
        <WeatherDisplay />
        <Forecast />
        <WeatherAlerts />
        <OfflineMode />
        <Settings />
      </div>
    </Provider>
  );
}

export default App;
