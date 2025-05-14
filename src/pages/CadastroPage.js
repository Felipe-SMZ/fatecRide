import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../App.css';

const CadastroPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    sexo: '',
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
      sexo: '',
      curso: '',
      telefone: '',
      email: '',
      confirmarEmail: '',
      senha: '',
      confirmarSenha: ''
    });
  };

  const handleAvancar = () => {
    const {
      nome,
      sobrenome,
      sexo,
      curso,
      telefone,
      email,
      confirmarEmail,
      senha,
      confirmarSenha
    } = formData;

    if (
      !nome ||
      !sobrenome ||
      !sexo ||
      !curso ||
      !telefone ||
      !email ||
      !confirmarEmail ||
      !senha ||
      !confirmarSenha
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (email !== confirmarEmail) {
      alert('Os e-mails não coincidem.');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // Se tudo estiver válido
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
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
          >
            <option value="">Sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>

          <select
            name="curso"
            value={formData.curso}
            onChange={handleChange}
          >
            <option value="">Curso</option>
            <option value="DSM">DSM</option>
            <option value="GE">GE</option>
            <option value="CD">CD</option>
            <option value="CE">CE</option>
            <option value="DP">DP</option>
            <option value="GPI">GPI</option>
          </select>
        </div>

        <div className="linha-inputs">
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
          <button onClick={handleLimpar} className="limpar-btn">Limpar tudo</button>
          <button onClick={handleAvancar}>Avançar</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;
