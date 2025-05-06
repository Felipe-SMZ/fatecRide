import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../App.css';

const VeiculoPage = () => {
  const navigate = useNavigate();
  const [veiculo, setVeiculo] = useState({
    modelo: '',
    placa: '',
    cor: '',
    ano: '',
    foto: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculo(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVeiculo(prev => ({ ...prev, foto: e.target.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação básica
    if (!veiculo.modelo || !veiculo.placa || !veiculo.cor || !veiculo.ano) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    console.log('Dados do veículo:', veiculo);
    navigate('/motorista');
  };

  return (
    <div className="veiculo-page">
      <header className="cabecalho">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-nome">FatecRide</h1>
      </header>

      <div className="veiculo-container">
        <h2 className="veiculo-titulo">Cadastre seu veículo</h2>
        
        <form className="formulario-veiculo" onSubmit={handleSubmit}>
          <div className="campo-veiculo">
            <label>Modelo*</label>
            <input
              type="text"
              name="modelo"
              value={veiculo.modelo}
              onChange={handleChange}
              placeholder="Ex: Onix 1.0"
              required
            />
          </div>

          <div className="campo-veiculo">
            <label>Placa*</label>
            <input
              type="text"
              name="placa"
              value={veiculo.placa}
              onChange={handleChange}
              placeholder="Ex: ABC1D23"
              required
            />
          </div>

          <div className="campo-veiculo">
            <label>Cor*</label>
            <input
              type="text"
              name="cor"
              value={veiculo.cor}
              onChange={handleChange}
              placeholder="Ex: Prata"
              required
            />
          </div>

          <div className="campo-veiculo">
            <label>Ano*</label>
            <input
              type="text"
              name="ano"
              value={veiculo.ano}
              onChange={handleChange}
              placeholder="Ex: 2020"
              required
            />
          </div>

          <div className="foto-container">
            <label>Foto do Veículo</label>
            <label className="upload-foto">
              {veiculo.foto ? (
                <img 
                  src={URL.createObjectURL(veiculo.foto)} 
                  alt="Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span>+</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          
          <div className="botoes-veiculo">
            <button 
              type="button" 
              className="botao-voltar"
              onClick={() => navigate('/escolhaperfil')}
            >
              Voltar
            </button>
            <button 
              type="submit" 
              className="botao-cadastrar"
              onClick={() => navigate('/cadastro')}
            >
              Cadastrar Veículo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VeiculoPage;