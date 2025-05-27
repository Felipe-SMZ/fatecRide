import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../css/CadastroVeiculoPage.css';

const VeiculoPage = () => {
  const navigate = useNavigate();
  const id_usuario = localStorage.getItem('id_usuario');

  const [veiculo, setVeiculo] = useState({
    modelo: '',
    marca: '',
    placa: '',
    cor: '',
    ano: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!veiculo.placa) {
      alert('A placa é obrigatória');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/veiculos/${id_usuario}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(veiculo)
      });

      if (!res.ok) throw new Error('Erro ao cadastrar veículo');

      navigate('/cadastro-endereco');
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  };

  return (
    <div className="veiculo-page">
      <header className="cabecalho">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Cadastro de Veículo</h1>
      </header>

      <form className="formulario-veiculo" onSubmit={handleSubmit}>
        <label>Modelo</label>
        <input type="text" name="modelo" value={veiculo.modelo} onChange={handleChange} />

        <label>Marca</label>
        <input type="text" name="marca" value={veiculo.marca} onChange={handleChange} />

        <label>Placa*</label>
        <input type="text" name="placa" value={veiculo.placa} onChange={handleChange} required />

        <label>Cor</label>
        <input type="text" name="cor" value={veiculo.cor} onChange={handleChange} />

        <label>Ano</label>
        <input type="number" name="ano" value={veiculo.ano} onChange={handleChange} />

        <button type="submit" className="botao-cadastrar">Cadastrar Veículo</button>
      </form>
    </div>
  );
};

export default VeiculoPage;
