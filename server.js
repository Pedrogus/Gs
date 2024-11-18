const express = require('express');
const cors = require('cors');
const pontosTuristicos = require('./src/data/pontosTuristicos.json');

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

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
