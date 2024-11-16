import React, { useState } from "react";
import './style.css'; 

const RewardsPage = () => {
  const [points, setPoints] = useState(2000);
  const [goal, setGoal] = useState(4000);

  const handleRedeem = () => {
    const discountCost = 200; 
    if (points >= discountCost) {
      setPoints(points + discountCost);
      alert("Pontos resgatado com sucesso!"); /* Fazer algo mais bonito */ 
    } else {
      alert("você não tem pontos para resgatar.");
    }
  };

  const [badges, setBadges] = useState([
    { id: 1, name: "Primeira Viagem Sustentável", unlocked: true },
    { id: 2, name: "10 Viagens em uma Semana", unlocked: false },
    { id: 3, name: "100 km Percorridos", unlocked: false },
  ]);

  const progress = Math.min((points / goal) * 100, 100);

  return (

      <>

      {/* Usuario */}
      <div className="user-profile-container">
      <div className="profile-header">
        <h2>Perfil do Usuário</h2>
      </div>
      <div className="profile-info">
        <div className="profile-pic">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="user-details">
          <h3>Nome: João da Silva</h3>
          <p>Email: joao@email.com</p>
          <p>Telefone: (XX) XXXXX-XXXX</p>
          <p>Localização: São Paulo, Brasil</p>
        </div>
      </div>
    </div>

    {/* Selos ou conquistas */}

    <div className="achievements">
      <h2>Suas Conquistas</h2>
      <div className="badges">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`badge ${badge.unlocked ? "unlocked" : "locked"}`}
          >
            <p>{badge.name}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* recompensas e desafios */}
    <div className="rewards">
      <header>
        <h1>Rewards</h1>
        <p>Gerencie suas recompensas e metas de pontos aqui.</p>
      </header>

      <section className="points">
        <div>
          <h3>Pontos de Viagem</h3>
          <h2>{points}</h2>
        </div>
        <div>
          <h3>Sequência de Viagens</h3>
          <p>Você usou um transporte sustentável</p>
        </div>
        <button onClick={handleRedeem}>Resgatar Pontos (200 pontos)</button>
      </section>

      <section className="goal">
        <h3>Minha Meta</h3>
        <p>Junte {goal} pontos para ganhar um desconto de 50% no cinema!</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{Math.floor(progress)}% concluído</p>
      </section>

      <section className="challenges">
        <h3>Desafios</h3>
        <ul>
          <li>Use uma bicicleta 3 vezes nesta semana - Ganhe 300 pontos!</li>
          <li>Viaje 10 km em scooters - Ganhe 500 pontos extras!</li>
        </ul>
      </section>

      <section className="history">
        <h3>Histórico de Pontos</h3>
        <ul>
          <li>+200 pontos - Viagem Sustentável - 15/11/2024</li>
          <li>-500 pontos - Resgate de desconto - 16/11/2024</li>
        </ul>
      </section>
    </div>

    </>
  );
};

export default RewardsPage;
