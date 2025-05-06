import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../App.css';

const EnderecoPage = () => {
  const navigate = useNavigate();
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposObrigatorios = ['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep'];
    const camposPreenchidos = camposObrigatorios.every(campo => endereco[campo]);

    if (!camposPreenchidos) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    console.log('Endereço cadastrado:', endereco);
    navigate('/inicio'); // ou a próxima página do seu fluxo
  };

  return (
    <div className="veiculo-page">
      <header className="cabecalho">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-nome">FatecRide</h1>
      </header>

      <div className="veiculo-container">
        <h2 className="veiculo-titulo">Cadastro de Endereço</h2>
        
        <form className="formulario-veiculo" onSubmit={handleSubmit}>
          <div className="campo-veiculo">
            <label>Rua*</label>
            <input type="text" name="rua" value={endereco.rua} onChange={handleChange} required />
          </div>

          <div className="campo-veiculo">
            <label>Número*</label>
            <input type="text" name="numero" value={endereco.numero} onChange={handleChange} required />
          </div>

          <div className="campo-veiculo">
            <label>Bairro*</label>
            <input type="text" name="bairro" value={endereco.bairro} onChange={handleChange} required />
          </div>

          <div className="campo-veiculo">
            <label>Cidade*</label>
            <input type="text" name="cidade" value={endereco.cidade} onChange={handleChange} required />
          </div>

          <div className="campo-veiculo">
            <label>Estado*</label>
            <input type="text" name="estado" value={endereco.estado} onChange={handleChange} required />
          </div>

          <div className="campo-veiculo">
            <label>CEP*</label>
            <input type="text" name="cep" value={endereco.cep} onChange={handleChange} required />
          </div>

          <div className="botoes-veiculo">
            <button type="button" className="botao-voltar" onClick={() => navigate(-1)}>
              Voltar
            </button>
            <button type="submit" className="botao-cadastrar">
              Cadastrar Endereço
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnderecoPage;
