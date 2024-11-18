import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

const MapComponent = () => {
  const [points, setPoints] = useState([]);
  const [search, setSearch] = useState("");
  const position = [-22.9519, -43.2105]; // Posição inicial (Brasil)

  useEffect(() => {
    // Buscar pontos turísticos da API
    axios.get('http://localhost:3001/api/pontos-turisticos')
      .then((response) => setPoints(response.data))
      .catch((error) => console.error("Erro ao buscar pontos turísticos:", error));
  }, []);

  const handleSearch = () => {
    // Buscar pontos turísticos pelo nome
    axios.get(`http://localhost:3001/api/pontos-turisticos/busca?nome=${search}`)
      .then((response) => setPoints(response.data))
      .catch((error) => console.error("Erro ao buscar pontos turísticos:", error));
  };


  return (
    <>
    <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((point) => (
        <Marker
          key={point.id}
          position={point.localizacao}
          icon={new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}
        >
          <Popup>
            <strong>{point.nome}</strong>
            <p>{point.descricao}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>


    <div style={{ marginBottom: '20px'}}>
      <input type='text' placeholder='Buscar ponto turistico...'
        value={search} onChange={(e) => setSearch(e.target.value)}
        style={{padding: '10px', width: '80%'}} />
        <button onClick={handleSearch} style={{padding: '10px'}}>Buscar</button>
    </div>
    </>
  );
};

export default MapComponent;


