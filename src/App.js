import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import RewardsPage from './Pages/RewardsPage';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
    <Router>

      <Navbar />

      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/rewards" element={<RewardsPage />} />

        {/* Beneficio de andar em veiculos eletricos */}
        { /* Historico de Viagem */}

      </Routes>
    </Router>

    </>
  );
}

export default App;
