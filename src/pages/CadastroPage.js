import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../css/CadastroPage.css';

const CadastroPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    telefone: '',
    idGenero: 1 // padrão masculino
  });

  const idTipoUsuario = Number(localStorage.getItem('idTipoUsuario') || 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.sobrenome || !form.email || !form.senha) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const dadosEnvio = {
      ...form,
      idTipoUsuario: idTipoUsuario,
      idGenero: Number(form.idGenero)
    };

    try {
      const res = await fetch('http://localhost:8080/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosEnvio)
      });

      if (!res.ok) throw new Error('Erro ao cadastrar');

      const data = await res.json();
      console.log('Resposta backend:', data);

      // Salva id do usuário retornado no localStorage
      localStorage.setItem('id_usuario', data.idUsuario || data.id); // conforme o backend

      if (idTipoUsuario === 1 || idTipoUsuario === 3) {
        navigate('/cadastro-veiculo');
      } else {
        navigate('/cadastro-endereco');
      }
    } catch (error) {
      alert('Erro no cadastro: ' + error.message);
    }
  };

  return (
    <div className="cadastro-page">
      <header className="cabecalho">
        <img src={logo} alt="Logo FatecRide" className="logo" />
        <h1>Cadastro de Usuário</h1>
      </header>

      <form className="formulario" onSubmit={handleSubmit}>
        <label>Nome*</label>
        <input type="text" name="nome" value={form.nome} onChange={handleChange} required />

        <label>Sobrenome*</label>
        <input type="text" name="sobrenome" value={form.sobrenome} onChange={handleChange} required />

        <label>Email*</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Senha*</label>
        <input type="password" name="senha" value={form.senha} onChange={handleChange} required />

        <label>Telefone</label>
        <input type="text" name="telefone" value={form.telefone} onChange={handleChange} />

        <label>Gênero</label>
        <select name="idGenero" value={form.idGenero} onChange={handleChange}>
          <option value={1}>Masculino</option>
          <option value={2}>Feminino</option>
        </select>

        <button type="submit" className="botao-cadastrar">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPage;
