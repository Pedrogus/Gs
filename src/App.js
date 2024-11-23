import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import RewardsPage from './Pages/RewardsPage';
import Navbar from './components/Navbar';
import History from './Pages/History';
import GerencieViagem from './Pages/GerencieViagem';
import Beneficios from './Pages/Beneficios';


function App() {
  return (
    <>
    <Router>
      <header>
        <Navbar />
      </header>
      <body>
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path='/benefitis' element={<Beneficios />} />
        <Route path='/history' element={<History />} />
        <Route path='/inicarViagem' element={<GerencieViagem />} />

      </Routes>
      </body>
    </Router>
    
    </>
  );
}

export default App;
