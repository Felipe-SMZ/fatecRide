import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EscolhaPerfilPage.css'
import logo from '../assets/images/Logo.png';

const EscolhaPerfilPage = () => {
  const navigate = useNavigate();

  const perfilToIdMap = {
    motorista: 2,
    passageiro: 1,
    ambos: 3
  };

  const handleSelecionarPerfil = (perfil) => {
    const idTipoUsuario = perfilToIdMap[perfil];
    localStorage.setItem('idTipoUsuario', idTipoUsuario);
    navigate('/cadastro');
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <img src={logo} alt="Logo FatecRide" />
        <h1>Qual seu perfil?</h1>
        <h2>Selecione como você quer usar o FatecRide</h2>
      </div>
      <div className="right-side">
        <h1>O que você deseja?</h1>
        <div className="perfil-options">
          <button className="perfil-btn" onClick={() => handleSelecionarPerfil('motorista')}>Dar carona</button>
          <button className="perfil-btn" onClick={() => handleSelecionarPerfil('passageiro')}>Receber carona</button>
          <button className="perfil-btn" onClick={() => handleSelecionarPerfil('ambos')}>Ambos</button>
        </div>
      </div>
    </div>
  );
};

export default EscolhaPerfilPage;
