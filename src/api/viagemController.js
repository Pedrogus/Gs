const fs = require('fs');
const path = require('path');

const pontosPath = path.join(__dirname, '../data/pontosTuristicos.json');
const usuariosPath = path.join(__dirname, '../data/usuarios.json');
const viagensPath = path.join(__dirname, '../data/viagens.json');

const calcularPontos = (modalidade, distancia) => {
  switch (modalidade.toLowerCase()) {
    case 'bicicleta':
      return distancia * 10;
    case 'scooter':
      return distancia * 8;
    case 'onibus':
      return distancia * 5;
    default:
      return 0;
  }
};

exports.iniciarViagem = (req, res) => {
  const { userId, partida, destino, modalidade } = req.body;

  if (!userId || !partida || !destino || !modalidade) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  const pontosTuristicos = JSON.parse(fs.readFileSync(pontosPath));
  const usuarios = JSON.parse(fs.readFileSync(usuariosPath));
  const viagens = JSON.parse(fs.readFileSync(viagensPath));

  const pontoPartida = pontosTuristicos.find((p) => p.nome === partida);
  const pontoDestino = pontosTuristicos.find((p) => p.nome === destino);

  if (!pontoPartida || !pontoDestino) {
    return res.status(404).json({ mensagem: 'Ponto de partida ou destino não encontrado.' });
  }

  const distancia = 5; // Simulando a distância como 5 km.
  const pontosGanhos = calcularPontos(modalidade, distancia);

  const novaViagem = {
    id: viagens.length + 1,
    userId,
    partida,
    destino,
    modalidade,
    distancia,
    pontosGanhos,
    data: new Date().toISOString(),
  };

  viagens.push(novaViagem);
  fs.writeFileSync(viagensPath, JSON.stringify(viagens, null, 2));

  const usuario = usuarios.find((u) => u.id === userId);
  if (usuario) {
    usuario.viagens.push(novaViagem.id);
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  }

  return res.status(201).json({
    mensagem: 'Viagem iniciada com sucesso!',
    detalhes: novaViagem,
  });
};
