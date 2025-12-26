import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateOrder from './pages/CreateOrder';
import FindTrips from './pages/FindTrips';
import CreateTrip from './pages/CreateTrip';
import FindCouriers from './pages/FindCouriers';
import MapPage from './pages/MapPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/find-trips" element={<FindTrips />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/find-couriers" element={<FindCouriers />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;