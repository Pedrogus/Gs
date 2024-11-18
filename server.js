const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const pontosTuristicos = require('./src/data/pontosTuristicos.json');
const usuarios = require('./src/data/usuario.json'); // Arquivo de usuários
const viagensPath = path.join(__dirname, './src/data/viagens.json'); // Caminho para o arquivo de viagens

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota para listar todos os pontos turísticos
app.get('/api/pontos-turisticos', (req, res) => {
  res.json(pontosTuristicos);
});

// Rota para buscar pontos turísticos por nome
app.get('/api/pontos-turisticos/busca', (req, res) => {
  const nome = req.query.nome?.toLowerCase();
  const resultados = pontosTuristicos.filter((ponto) =>
    ponto.nome.toLowerCase().includes(nome)
  );
  res.json(resultados);
});

// Rota para iniciar uma viagem
app.post('/api/iniciar-viagem', (req, res) => {
  const { userId, partida, destino, modalidade } = req.body;

  // Validar se os campos obrigatórios foram enviados
  if (!userId || !partida || !destino || !modalidade) {
    return res.status(400).json({ error: 'Dados incompletos. Verifique os campos enviados.' });
  }

  // Verificar se o usuário existe
  const usuario = usuarios.find((user) => user.id === userId);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  // Verificar se os pontos de partida e destino existem
  const pontoPartida = pontosTuristicos.find((ponto) => ponto.nome === partida);
  const pontoDestino = pontosTuristicos.find((ponto) => ponto.nome === destino);

  if (!pontoPartida || !pontoDestino) {
    return res.status(404).json({ error: 'Ponto de partida ou destino não encontrado.' });
  }

  // Calcular distância fixa para simplificação (exemplo: 5 km)
  const distancia = 5;

  // Calcular os pontos ganhos com base na modalidade
  let pontosPorKm;
  switch (modalidade.toLowerCase()) {
    case 'bicicleta':
      pontosPorKm = 10;
      break;
    case 'scooter':
      pontosPorKm = 8;
      break;
    case 'onibus':
      pontosPorKm = 5;
      break;
    default:
      return res.status(400).json({ error: 'Modalidade de transporte inválida.' });
  }

  const pontosGanhos = distancia * pontosPorKm;

  // Criar um registro de viagem
  const novaViagem = {
    id: uuidv4(),
    userId,
    partida,
    destino,
    modalidade,
    distancia,
    pontosGanhos,
  };

  // Atualizar o arquivo de viagens
  const viagens = JSON.parse(fs.readFileSync(viagensPath, 'utf8'));
  viagens.push(novaViagem);
  fs.writeFileSync(viagensPath, JSON.stringify(viagens, null, 2));

  // Atualizar o histórico do usuário
  usuario.historico = usuario.historico || [];
  usuario.historico.push(novaViagem.id);

  fs.writeFileSync(
    path.join(__dirname, './src/data/usuarios.json'),
    JSON.stringify(usuarios, null, 2)
  );

  // Retornar os detalhes da viagem
  res.json({
    detalhes: {
      distancia,
      pontosGanhos,
      partida,
      destino,
      modalidade,
    },
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
