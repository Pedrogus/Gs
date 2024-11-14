import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';

const position = [51.505, -0.09];
const points = [
  { position: [51.505, -0.09], title: "Ponto Turístico 1" },
  { position: [51.515, -0.1], title: "Ponto Turístico 2" },
  { position: [51.525, -0.11], title: "Ponto Turístico 3" }
];

const MapComponent = () => {
  return (
    <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point, index) => (
        <Marker key={index} position={point.position} icon={new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}>
          <Popup>{point.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;


