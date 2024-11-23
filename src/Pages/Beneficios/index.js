import React from "react";
import "./style.css";

const Beneficios = () => {
  const beneficios = [
    {
      id: 1,
      titulo: "Descontos Exclusivos",
      descricao: "Ganhe descontos em lojas parceiras e viagens ao acumular pontos.",
      icone: "🛍️",
    },
    {
      id: 2,
      titulo: "Benefícios Ambientais",
      descricao: "Contribua para a redução da emissão de carbono e ajude o planeta.",
      icone: "🌱",
    },
    {
      id: 3,
      titulo: "Saúde e Bem-Estar",
      descricao: "Melhore sua saúde física ao optar por bicicletas e caminhadas.",
      icone: "🚴",
    },
    {
      id: 4,
      titulo: "Recompensas Financeiras",
      descricao: "Troque seus pontos por créditos ou viagens gratuitas.",
      icone: "💸",
    },
  ];

  return (
    <div className="beneficios-page">
      <div className="beneficios-header">
        <h1>Benefícios do Transporte Sustentável</h1>
        <p>
          Ao optar por meios de transporte ecológicos, você não apenas contribui para um
          planeta mais limpo, mas também recebe recompensas exclusivas!
        </p>
      </div>
      <div className="beneficios-container">
        {beneficios.map((beneficio) => (
          <div key={beneficio.id} className="beneficio-card">
            <span className="beneficio-icone">{beneficio.icone}</span>
            <h2>{beneficio.titulo}</h2>
            <p>{beneficio.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Beneficios;
