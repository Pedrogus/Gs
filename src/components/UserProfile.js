import React from 'react';
import './UserProfile.css'; 

const UserProfile = () => {
  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h2>Perfil do Usuário</h2>
      </div>
      <div className="profile-info">
        <div className="profile-pic">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="user-details">
          <h3>Nome: João da Silva</h3>
          <p>Email: joao@email.com</p>
          <p>Telefone: (XX) XXXXX-XXXX</p>
          <p>Localização: São Paulo, Brasil</p>
        </div>
      </div>
      <div className="user-rewards">
        <h3>Tokens Disponíveis: 200 Tokens</h3>
      </div>
    </div>
  );
};

export default UserProfile;

