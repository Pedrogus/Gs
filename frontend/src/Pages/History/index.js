import React, { useState, useEffect } from "react";
import './style.css';

const History = () => {
  const [viagens, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4; 

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentViagens = viagens.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/viagens');
        if (!response.ok) {
          throw new Error("Erro ao carregar viagens");
        }
        const data = await response.json();
        setTrips(data);
      } catch (err) {
        console.error(err.message);
        setError("Não foi possível carregar o histórico de viagens.");
      }
    };

    fetchTrips();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (viagens.length === 0) {
    return <p>Carregando ou nenhum histórico encontrado...</p>;
  }

  return ( 
    <div className="historico-page">
  <div className="historico">
    <h1>Histórico de Viagens</h1>
    <div className="viagens-container">
      {currentViagens.length > 0 ? (
        currentViagens.map((viagem) => (
          <div key={viagem.id} className="viagem-card">
            <h2>{viagem.partida} → {viagem.destino}</h2>
            <p><strong>Modalidade:</strong> {viagem.modalidade}</p>
            <p><strong>Distância:</strong> {viagem.distancia.toFixed(2)} km</p>
            <p><strong>Pontos Ganhos:</strong> {viagem.pontosGanhos.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma viagem encontrada.</p>
      )}
    </div>
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span>Página {currentPage} de {Math.ceil(viagens.length / cardsPerPage)}</span>
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(viagens.length / cardsPerPage)))
        }
        disabled={endIndex >= viagens.length}
      >
        Próxima
      </button>
    </div>
  </div>
</div>

  );
};

export default History;
