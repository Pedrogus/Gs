import MapComponent from '../../components/MapComponent';
import React, { useState } from 'react';
import './style.css';
import TripManager from '../../components/TripManager';


const Home = () => {
  
  const [tokens, setTokens] = useState(0);
  const [vehicle, setVehicle] = useState('');

  
  const handleRent = (vehicleType) => {
    let tokenCount = 0;

    // Defina a quantidade de tokens para cada tipo de veículo
    if (vehicleType === 'bicicleta') {
      tokenCount = 10;  // Exemplo: 10 tokens para bicicleta
    } else if (vehicleType === 'scooter') {
      tokenCount = 15;  // Exemplo: 15 tokens para scooter
    } else if (vehicleType === 'onibus') {
        tokenCount = 20
    }

  
    setTokens(tokenCount);
    setVehicle(vehicleType);
  };

  const handleRedeem = () => {
    setTokens(0); 
    setVehicle(''); 
  };

  return (

    <>
      <div className="travel-section">
  <div className="map-container">
    {/* Insira aqui o componente de mapa */}
    <MapComponent />
  </div>
  <div className="trip-manager-container">
    {/* Insira aqui o gerenciador de viagens */}
    <TripManager />
  </div>
</div>
    </>
  );
};

export default Home;

