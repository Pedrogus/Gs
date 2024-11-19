import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-logo">
      <a href="/" > <img src="./assets/logo.svg" alt="Gs-Electric Logo" className="logo-image" /> </a>
        <span>Gs-Electric </span>
      </div>
      <nav className="navbar-links">
        <a href="#saiba-mais">Saiba Mais</a>
        <a href="#beneficios">Benefícios</a>
        <a href="#historico">Histórico</a>
        <a href="/rewards">Recompensas</a>
      </nav>
    </header>
  );
};

export default Navbar;
