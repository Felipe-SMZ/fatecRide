import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import carroImg from '../assets/images/carro.png';
import pessoaImg from '../assets/images/pessoa.png';
import '../App.css'; 

const InicioPage = () => {
  const navigate = useNavigate();

  const handleMotoristaClick = () => {
    navigate('/motorista');
  };

  const handlePassageiroClick = () => {
    navigate('/passageiro');
  };

  return (
    <div className="inicio-page">
      <header className="inicio-header">
        <img src={logo} alt="Logo" className="inicio-logo" />
        <h1 className="inicio-titulo">O que você deseja?</h1>
      </header>

      <div className="botoes-container">
        <button className="botao-escolha" onClick={handleMotoristaClick}>
          <img src={carroImg} alt="Motorista" className="botao-img" />
          <span>Motorista</span>
        </button>

        <button className="botao-escolha" onClick={handlePassageiroClick}>
          <img src={pessoaImg} alt="Passageiro" className="botao-img" />
          <span>Passageiro</span>
        </button>
      </div>
    </div>
  );
};

export default InicioPage;
