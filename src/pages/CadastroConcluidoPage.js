import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import '../css/CadastroConcluidoPage.css';

const CadastroConcluidoPage = () => {
  const navigate = useNavigate();

  const handleIrParaLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <Header />
      <div className="cadastro-concluido-page">
        <h2>Cadastro concluído com sucesso!</h2>
        <button onClick={handleIrParaLogin}>Ir para Login</button>
      </div>
    </div>
  );
};

export default CadastroConcluidoPage;
