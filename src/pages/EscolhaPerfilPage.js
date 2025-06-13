import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EscolhaPerfilPage.css';
import Header from '../components/Header/Header.jsx'; // ou o caminho correto

const EscolhaPerfilPage = () => {
  const navigate = useNavigate();

  const perfilParaUserTypeId = {
    passageiro: 1,
    motorista: 2,
    ambos: 3,
  };

  const handlePerfilEscolhido = (perfil) => {
    const userTypeId = perfilParaUserTypeId[perfil];
    navigate('/cadastro', { state: { userTypeId } });
  };

  return (
    <div>
      <Header />
      <div className="escolha-perfil-page">
        <h2>Escolha seu perfil</h2>
        <button onClick={() => handlePerfilEscolhido('passageiro')}>Passageiro</button>
        <button onClick={() => handlePerfilEscolhido('motorista')}>Motorista</button>
        <button onClick={() => handlePerfilEscolhido('ambos')}>Ambos</button>
      </div>
    </div>

  );
};

export default EscolhaPerfilPage;
