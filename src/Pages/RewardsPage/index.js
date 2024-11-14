import React from 'react';
import './style.css'; // Importe o CSS para a página de rewards
import UserProfile from '../../components/UserProfile';

const RewardsPage = () => {
  return (
    <>
   
    <UserProfile />

    <div className="rewards-section">
      <h3>Recompensas Disponíveis</h3>
      
      {/* Lista de Recompensas */}
      <div className="rewards-list">
        <div className="reward-card">
          <h4>50% de Desconto</h4>
          <p>Para o próximo aluguel de bicicleta</p>
          <button className="redeem-button">Resgatar</button>
        </div>

        <div className="reward-card">
          <h4>5 Km Grátis</h4>
          <p>Para a sua próxima viagem de scooter elétrica</p>
          <button className="redeem-button">Resgatar</button>
        </div>

        <div className="reward-card">
          <h4>1 Hora Grátis</h4>
          <p>Desconto para quem alugar mais de 2 horas</p>
          <button className="redeem-button">Resgatar</button>
        </div>


        <div className="reward-card">
          <h4>10% no cinema</h4>
          <p>Desconto para quem tem mais de 200 tokens</p>
          <button className="redeem-button">Resgatar</button>
        </div>
      </div>
    </div>

    </>
  );
};

export default RewardsPage;

