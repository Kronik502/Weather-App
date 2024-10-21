import React, { useState, useEffect } from 'react';
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
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import './components/WeatherDisplay.css';
import './components/custom.scss';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Navbar expand="lg" className="bg-primary">
            <Container>
              <Navbar.Brand href="#home">Weather Kronikles</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {currentUser ? (
                    <>
                      <Nav.Link href="/weather">Weather App</Nav.Link>
                      <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/signup">Sign Up</Nav.Link>
                      <Nav.Link href="/login">Login</Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login onLogin={setCurrentUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/weather" element={
              <ProtectedRoute>
                <div>
                  <LocationInput />
                  <WeatherDisplay />
                  <Forecast />
                  <WeatherAlerts />
                  <OfflineMode />
                  <Settings />
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
