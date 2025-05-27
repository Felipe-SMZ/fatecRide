// src/pages/CadastroConcluidoPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../css/CadastroConcluidoPage.css';

const CadastroConcluidoPage = () => {
  const navigate = useNavigate();

  const voltarParaInicio = () => {
    navigate('/'); // ou a rota que desejar
  };

  return (
    <div className="cadastro-concluido-page">
      <header className="cabecalho">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Cadastro Concluído</h1>
      </header>

      <div className="mensagem-concluido">
        <p>Seu cadastro foi concluído com sucesso!</p>
        <button onClick={voltarParaInicio} className="botao-voltar">Voltar para o Início</button>
      </div>
    </div>
  );
};

export default CadastroConcluidoPage;
