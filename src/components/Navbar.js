import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none' }}>
        <li>
          <Link to="/">Home</Link> {/* Link para a página inicial */}
        </li>
        <li>
          <Link to="/saibaMais">Saiba Mais</Link> {/* Link para a página de perfil */}
        </li>
        <li>
          <Link to="#"> Beneficios  </Link> {/* Link para a página de beneficios do transporte sustentavel */}
        </li>
        <li>
          <Link to="#"> Historico </Link> {/* Link para a página do Historico de Viagem*/}
        </li>
        <li>
          <Link to="/rewards">Recompensas</Link> {/* Link para a página de recompensas */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
