import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate no lugar de useHistory
import '../App.css';
import logo from '../assets/images/Logo.png';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // useNavigate para navegação

  const handleLogin = () => {
    // Validação de exemplo, substitua por lógica real de autenticação
    if (email === 'user@fatec.com' && senha === '123') {
      navigate('/inicio'); // Redireciona para a página inicial após login
    } else {
      alert('Email ou senha inválidos');
    }
  };

  const handleRecuperarSenha = () => {
    navigate('/recuperacao-senha'); // Redireciona para a página de recuperação de senha
  };

  const handleCadastro = () => {
    navigate('/escolhaperfil'); // Redireciona para a página de cadastro
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
