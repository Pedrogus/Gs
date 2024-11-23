import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripManager = () => {
  const [userId, setUserId] = useState(1); // Simulando usuário logado
  const [pontosTuristicos, setPontosTuristicos] = useState([]);
  const [partida, setPartida] = useState('');
  const [destino, setDestino] = useState('');
  const [modalidade, setModalidade] = useState('bicicleta');
  const [detalhesViagem, setDetalhesViagem] = useState(null);
  const [erro, setErro] = useState('');

  // Carregar pontos turísticos da API
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/pontos-turisticos')
      .then((response) => {
        setPontosTuristicos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar pontos turísticos:', error);
      });
  }, []);

  // Função para iniciar a viagem
  const iniciarViagem = () => {
    if (!partida || !destino) {
      setErro('Por favor, selecione o ponto de partida e o destino.');
      return;
    }

    if (partida === destino) {
      setErro('O ponto de partida e o destino não podem ser os mesmos.');
      return;
    }

    setErro('');

    // Encontrar os pontos de partida e destino com base nos nomes
    const pontoPartida = pontosTuristicos.find((ponto) => ponto.nome === partida);
    const pontoDestino = pontosTuristicos.find((ponto) => ponto.nome === destino);

    if (!pontoPartida || !pontoDestino) {
      setErro('Não foi possível encontrar os pontos turísticos.');
      return;
    }

    // Enviar os dados para a API para calcular a distância e pontos ganhos
    axios
      .post('http://localhost:3001/api/iniciar-viagem', {
        userId,
        partida,
        destino,
        modalidade,
      })
      .then((response) => {
        setDetalhesViagem(response.data.detalhes);
      })
      .catch((error) => {
        console.error('Erro ao iniciar a viagem:', error);
        setErro('Ocorreu um erro ao iniciar a viagem.');
      });
  };
  

  return (
    <div>
      <h1>Gerenciar Viagem</h1>
      <form>
        <div>
          <label>Ponto de Partida:</label>
          <select
            value={partida}
            onChange={(e) => setPartida(e.target.value)}
          >
            <option value="">Selecione</option>
            {pontosTuristicos.map((ponto) => (
              <option key={ponto.nome} value={ponto.nome}>
                {ponto.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Destino:</label>
          <select
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
          >
            <option value="">Selecione</option>
            {pontosTuristicos.map((ponto) => (
              <option key={ponto.nome} value={ponto.nome}>
                {ponto.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Modalidade de Transporte:</label>
          <select
            value={modalidade}
            onChange={(e) => setModalidade(e.target.value)}
          >
            <option value="bicicleta">Bicicleta</option>
            <option value="scooter">Scooter</option>
            <option value="onibus">Ônibus</option>
          </select>
        </div>

        <button type="button" onClick={iniciarViagem}>
          Iniciar Viagem
        </button>
      </form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {detalhesViagem && (
        <div>
          <h2>Detalhes da Viagem</h2>
          <p>Distância: {detalhesViagem.distancia} km</p>
          <p>Pontos Ganhos: {detalhesViagem.pontosGanhos}</p>
          <p>
            Viagem de {detalhesViagem.partida} para {detalhesViagem.destino} usando{' '}
            {detalhesViagem.modalidade}.
          </p>
        </div>
      )}
    </div>
  );
};

export default TripManager;
