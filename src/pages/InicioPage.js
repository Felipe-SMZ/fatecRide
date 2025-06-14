import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/HeaderMenu.jsx'; 
import carroImg from '../assets/images/carro.png';
import pessoaImg from '../assets/images/pessoa.png';
import '../css/InicioPage.css'; 

const InicioPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="inicio-container">
      <Header />
      <div className="inicio-content">
        <h2 className="inicio-title">O que você deseja?</h2>
        <div className="botoes-container">
          <button className="botao-escolha" onClick={() => navigate('/motorista')}>
            <img src={carroImg} alt="Motorista" />
            <span>Motorista</span>
          </button>
          <button className="botao-escolha" onClick={() => navigate('/passageiro')}>
            <img src={pessoaImg} alt="Passageiro" />
            <span>Passageiro</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InicioPage;
