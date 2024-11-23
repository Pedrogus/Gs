import React, { useState, useEffect } from "react";
import './style.css'; 


const RewardsPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [badges, setBadges] = useState([]);
  const [goal, setGoal] = useState(500);
  const [progress, setProgress] = useState(0);
 
  const usuarioId = 1;
 
  useEffect(() => {
    // Fetch inicial para obter as recompensas do usuário
    const fetchRewards = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/recompensas?usuarioId=${usuarioId}`);
        if (!response.ok) throw new Error('Erro ao buscar recompensas');
        const data = await response.json();
        setUsuario(data);
        setBadges(data.conquistas || []);
        setProgress(Math.min((data.pontos / goal) * 100, 100));
      } catch (error) {
        console.error(error);
      }
    };

    fetchRewards();
  }, [usuarioId, goal]);

  if (!usuario) {
    return <p>Carregando informações do usuário...</p>;
  }

  const handleRedeemPoints = async () => {
    const pontosParaResgatar = 100; // Exemplo: quantidade fixa para resgatar
    if (!usuario || usuario.pontos < pontosParaResgatar) {
      alert('Pontos insuficientes para resgatar.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/resgatar-pontos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, pontosParaResgatar }),
      });

      if (!response.ok) throw new Error('Erro ao resgatar pontos');

      const data = await response.json();
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        pontos: data.pontosRestantes,
      }));

      alert(data.mensagem); // Exibe mensagem de confirmação
    } catch (error) {
      console.error(error);
      alert('Erro ao tentar resgatar pontos.');
    }
  };

  if (!usuario) {
    return <p>Carregando...</p>;
  }

  return (

    <>
    {/* Perfil do Usuário */}
    <div className="user-profile-container">
      <div className="profile-header">
        <h2>Perfil do Usuário</h2>
      </div>
      <div className="profile-info">
        <div className="profile-pic">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="user-details">
        <h3>Nome: {usuario.nome || "Não informado"}</h3>
            <p>Email: {usuario.email || "Não informado"}</p>
            <p>Telefone: {usuario.telefone || "Não informado"}</p>
        </div>
      </div>
    </div>


    {/* Conquistas */}
    <div className="achievements">
      <h2>Suas Conquistas</h2>
      <div className="badges">
        {badges.map((badge, index) => (
          <div key={index} className="badge unlocked">
            <p>{badge}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Recompensas */}
    <div className="rewards">
      <header>
        <h1>Rewards</h1>
        <p>Gerencie suas recompensas e metas de pontos aqui.</p>
      </header>

      <section className="points">
        <div>
          <h3>Pontos para Resgatar</h3>
          <h2>{usuario.pontos}</h2>
        </div>
        <button onClick={handleRedeemPoints}>Resgatar Pontos</button>
      </section>

      {/* Meta */}
      <section className="goal">
        <h3>Minha Meta</h3>
        <p>Junte {goal} pontos para ganhar uma nova conquista!</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p>{Math.floor(progress)}% concluído</p>
      </section>
    </div>
  </>
  );
};

export default RewardsPage;
