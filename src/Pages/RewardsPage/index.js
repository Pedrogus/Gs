import React, { useState, useEffect } from "react";
import './style.css'; 
import usuario from '../../data/usuario.json';
import desafios from '../../data/desafios.json';

const RewardsPage = () => {
  const [points, setPoints] = useState(0);
  const [goal, setGoal] = useState(4000);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if(usuario && usuario.pontos){
      setPoints(usuario.pontos);
    }
   if(desafios && desafios.length > 0) {
      setBadges(desafios)
   }
  }, []);

  useEffect(() => {
    if(points >= goal) {
      setBadges((prevBadges) => 
        prevBadges.map((badge) => 
          badge.id === 2 ? {...badge, unlocked: true }
            : badge
          ) 
        );

        if(goal === 4000) {
          setGoal(8000);
        } else if (goal === 8000) {
          setBadges((prevBadges) =>
            prevBadges.map((badge) =>
              badge.id === 3 ? { ...badge, unlocked: true } : badge
            )
          );
        }

    }
  }, [points, goal]);

  const handleAddPoints = () => {
      setPoints((prevPoints) => prevPoints + 500);
  };

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
          <h3>Nome: {usuario.nome}</h3>
          <p>Email: {usuario.email}</p>
          <p>Telefone: {usuario.telefone}</p>
          <p>Localização: {usuario.localizacao}</p>
        </div>
      </div>
    </div>

    {/* Selos e conquistas */}

    <div className="achievements">
      <h2>Suas Conquistas</h2>
      <div className="badges">
        {badges.map((badge) => (
          <div
            key={desafios.id}
            className={`badge ${badge.unlocked ? "unlocked" : "locked"}`}
          >
            <p>{badge.nome}</p>
          </div>
        ))}
      </div>
    </div>
    
    
    {/* recompensas */}
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
        <button onClick={handleAddPoints}>Resgatar Pontos (200 pontos)</button>
      </section>

      {/* Meta */}

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

      {/* Desafios */}

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
