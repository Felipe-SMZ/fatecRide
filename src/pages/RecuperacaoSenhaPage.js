import React, { useState } from 'react';
import Logo from '../assets/images/Logo.png';
import '../App.css';

const RecuperacaoSenhaPage = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleRecuperar = () => {
    // Simulação: se o email for esse, consideramos válido
    if (email === 'user@fatec.com') {
      setMensagem('Um email para recuperar a senha foi enviado.');
    } else {
      setMensagem('Email inválido.');
    }
  };

  return (
    <div className="recuperacao-page">
      <div className="recuperacao-container">
        <img src={Logo} alt="Logo FatecRide" className="logo-recuperacao" />
        <h2>Recuperar Senha</h2>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleRecuperar}>Recuperar Senha</button>
        {mensagem && (
          <p className={`mensagem ${mensagem.includes("inválido") ? "erro" : ""}`}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecuperacaoSenhaPage;
