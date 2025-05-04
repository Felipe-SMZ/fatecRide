import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../assets/images/Logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'user@fatec.com' && senha === '123') {
      navigate('/inicio');
    } else {
      alert('Email ou senha inválidos');
    }
  };

  const handleRecuperarSenha = () => {
    navigate('/recuperacao-senha');
  };

  const handleCadastro = () => {
    navigate('/escolha-perfil');
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <img src={logo} alt="Logo FatecRide" />
        <h1>Bem-vindo</h1>
        <h2>Pegue carona de um jeito mais fácil</h2>
      </div>
      <div className="right-side">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
        <button onClick={handleCadastro}>Criar conta</button>
        <button onClick={handleRecuperarSenha}>Esqueci a senha</button>
      </div>
    </div>
  );
};

export default LoginPage;