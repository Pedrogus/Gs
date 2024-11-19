const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const pontosTuristicos = require('./src/data/pontosTuristicos.json');
const usuarios = require('./src/data/usuarios.json'); // Arquivo de usuários

const viagensPath = path.join(__dirname, './src/data/viagens.json'); // Caminho para o arquivo de viagens
const usuariosPath = path.join(__dirname, './src/data/usuarios.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


// Rota para listar todos os pontos turísticos
app.get('/api/pontos-turisticos', (req, res) => {
  res.json(pontosTuristicos);
});

// Rota para verificar conquistas e recompensas
app.get('/api/recompensas', (req, res) => {
  const usuarioId = parseInt(req.query.usuarioId); // Obtém o ID do usuário na query string

  // Valida se o ID é um número válido
  if (isNaN(usuarioId)) {
      return res.status(400).json({ error: 'ID do usuário inválido' });
  }

  // Lê os dados do arquivo JSON
  let usuarios;
  try {
      const usuariosData = fs.readFileSync(usuariosPath, 'utf-8');
      usuarios = JSON.parse(usuariosData);
  } catch (error) {
      return res.status(500).json({ error: 'Erro ao carregar os dados dos usuários.' });
  }

  // Encontra o usuário pelo ID
  const usuario = usuarios.find((user) => user.id === usuarioId);

  if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  // Resposta com informações de recompensas
  return res.json({
      nome: usuario.nome,
      
      pontos: usuario.pontos, // Pontos acumulados do usuário
      conquistas: usuario.conquistas || [], // Lista de conquistas desbloqueadas
      progressoDesafios: usuario.desafios || {}, // Progresso nos desafios
      desafiosDisponiveis: [
          { nome: 'Use uma bicicleta 3 vezes em uma semana', recompensa: 300 },
          { nome: 'Viaje 10 km em scooters', recompensa: 500 }
      ] 
  });
});

// Rota para resgatar pontos
app.post('/api/resgatar-pontos', (req, res) => {
  const { usuarioId, pontosParaResgatar } = req.body;

  if (!usuarioId || !pontosParaResgatar) {
    return res.status(400).json({ error: 'ID do usuário e pontos para resgatar são obrigatórios.' });
}

if (isNaN(pontosParaResgatar) || pontosParaResgatar <= 0) {
    return res.status(400).json({ error: 'A quantidade de pontos para resgatar deve ser um número positivo.' });
}

  // carregando dados do arquivo json
  let usuarios;
    try {
        const usuariosData = fs.readFileSync(usuariosPath, 'utf-8');
        usuarios = JSON.parse(usuariosData);
    } catch (error) {
        console.error('Erro ao carregar dados dos usuários:', error.message);
        return res.status(500).json({ error: 'Erro ao carregar os dados dos usuários.' });
    }

    // Encontrar o usuário pelo ID
    const usuario = usuarios.find(user => user.id === usuarioId);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verificar se o usuário tem pontos suficientes
    if (usuario.pontos < pontosParaResgatar) {
        return res.status(400).json({ error: 'Pontos insuficientes para resgatar.' });
    }

    // Atualizar os pontos do usuário
    usuario.pontos -= pontosParaResgatar;

    // Salvar as alterações no arquivo JSON
    try {
        fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
    } catch (error) {
        console.error('Erro ao salvar dados dos usuários:', error.message);
        return res.status(500).json({ error: 'Erro ao salvar os dados dos usuários.' });
    }

    // Responder com confirmação
    return res.json({
        mensagem: 'Resgate realizado com sucesso.',
        pontosRestantes: usuario.pontos
    });
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
