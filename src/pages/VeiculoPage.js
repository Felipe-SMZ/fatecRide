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

  // ... (manter as funções handleChange e handleFotoChange)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!veiculo.modelo || !veiculo.placa || !veiculo.cor || !veiculo.ano) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    console.log('Dados do veículo:', veiculo);
    navigate('/inicio'); // Redireciona para página inicial após cadastro
  };

  return (
    <div className="veiculo-page">
      {/* ... (restante do JSX permanece igual) ... */}
    </div>
  );
};

export default VeiculoPage;