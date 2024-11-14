import MapComponent from '../../components/MapComponent';
import React, { useState } from 'react';
import './style.css';


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
    <div className="home">
      <section className="search">
        <h1>Encontre um metodo de transporte sustentável perto de você</h1>
        <div className="location-search">
          <input type="text" placeholder="Digite qual ponto turístico..." />
          <button>Buscar</button>
        </div>
      </section>
      

      <section className="vehicle-list">
        <div className="vehicle-card">
          <h3>Bicicleta Elétrica</h3>
          <p>R$15,00/hora</p>
          <button onClick={() => handleRent('bicicleta')}>Ir de Bike</button>
        </div>
        <div className="vehicle-card">
          <h3>Scooter Elétrica</h3>
          <p>R$20,00/hora</p>
          <button onClick={() => handleRent('scooter')}>Ir de Scooter</button>
        </div>

        <div className="vehicle-card">
          <h3>Onibus Eletrico</h3>
          <p>R$ 4,40 a passagem</p>
          <button onClick={() => handleRent('onibus')}>Ir de Onibus</button>
        </div>
      </section>

      {/* Card Dinâmico de Tokens */}
      {tokens > 0 && (
        <div className="token-card">
          <h4>Parabéns! Você escolheu um método sustentável</h4>
          <p>Você vai ganhar <strong>{tokens}</strong> tokens por usar a {vehicle}!</p>
          <button className="redeem-button" onClick={handleRedeem}>Resgatar Tokens</button>
        </div>
      )}
    </div>
  );
};

export default Home;

