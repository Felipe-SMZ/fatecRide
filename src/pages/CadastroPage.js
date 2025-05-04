import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../App.css';

const CadastroPage = () => {
  const navigate = useNavigate();
  const tipoPerfil = localStorage.getItem('tipoPerfil');

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    curso: '',
    telefone: '',
    email: '',
    confirmarEmail: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLimpar = () => {
    setFormData({
      nome: '',
      sobrenome: '',
      curso: '',
      telefone: '',
      email: '',
      confirmarEmail: '',
      senha: '',
      confirmarSenha: ''
    });
  };

  const handleAvancar = () => {
    if (tipoPerfil === 'ambos') {
      navigate('/cadastro-veiculo');
    } else {
      navigate('/inicio');
    }
  };

  return (
    <div className="cadastro-page">
      <header className="cabecalho">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-nome">FatecRide</h1>
      </header>

      <h2 className="cadastro-titulo">Cadastro</h2>

      <div className="formulario-cadastro">
        {/* ... (mantenha todos os inputs existentes) ... */}
        
        <div className="botoes-cadastro">
          <button onClick={handleAvancar}>Avançar</button>
          <button onClick={handleLimpar} className="limpar-btn">Limpar tudo</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;