import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const fetchPontosTuristicos = async () => {
  const response = await axios.get(`${API_URL}/pontos-turisticos`);
  return response.data;
};

export const searchPontosTuristicos = async (nome) => {
  const response = await axios.get(`${API_URL}/pontos-turisticos/busca`, {
    params: { nome },
  });
  return response.data;
};
