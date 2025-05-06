import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../App.css';

const CadastroPage = () => {
  const navigate = useNavigate();

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
    // você pode adicionar validações aqui antes de navegar
    navigate('/cadastro-endereco');
  };

  return (
    <div className="cadastro-page">
      <header className="cabecalho">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-nome">FatecRide</h1>
      </header>

      <h2 className="cadastro-titulo">Cadastro</h2>

      <div className="formulario-cadastro">
        <div className="linha-inputs">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <input
            type="text"
            name="sobrenome"
            placeholder="Sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
          />
        </div>

        <div className="linha-inputs">
          <input
            type="text"
            name="curso"
            placeholder="Curso"
            value={formData.curso}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="linha-inputs">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="email"
            name="confirmarEmail"
            placeholder="Confirmar Email"
            value={formData.confirmarEmail}
            onChange={handleChange}
          />
        </div>

        <div className="linha-inputs">
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
          />
        </div>

        <div className="botoes-cadastro">
          <button onClick={handleAvancar}>Avançar</button>
          <button onClick={handleLimpar} className="limpar-btn">Limpar tudo</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;
