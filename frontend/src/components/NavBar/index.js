import React, { useEffect, useState } from "react";
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
        <a href="/inicarViagem">Viaje conosco</a>
        <a href="/benefitis">Benefícios</a>
        <a href="/history">Histórico</a>
        <a href="/rewards">Recompensas</a>
      </nav>
    </header>
  );
};

export default Navbar;
