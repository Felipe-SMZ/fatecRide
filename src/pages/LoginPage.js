import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Preencha todos os campos');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/inicio');
      } else {
        alert('Email ou senha inválidos');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor');
      console.error(error);
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
        <div className="login-form">
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
    </div>
  );
};

export default LoginPage;
