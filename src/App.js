import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import LocationInput from './components/LocationInput';
import Forecast from './components/Forecast';
import WeatherAlerts from './components/WeatherAlerts';
import WeatherDisplay from './components/WeatherDisplay';
import OfflineMode from './components/OfflineMode';
import Settings from './components/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Login from './login';
import Signup from './signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/WeatherDisplay.css';
import './components/custom.scss'; // Ensure this file exists and is correctly imported

function App() {
  return (
    <Provider className='appp' store={store}>
      <BrowserRouter>
        <div>
          <Navbar expand="lg" className="bg-primary"> {/* Adjusted to a class that reflects your theme */}
            <Container>
              <Navbar.Brand href="#home">Weather Kronikles</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/weather">Weather App</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/weather" element={<div><LocationInput /><WeatherDisplay /><Forecast /><WeatherAlerts /><OfflineMode /><Settings /></div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
