import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/images/Logo.png';
import '../css/InformacoesCarroPage.css';
import UserMenu from '../components/UserMenu/UserMenu';  
import '../components/UserMenu/UserMenu.css';

const InformacoesCarroPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    cor: '',
    placa: '',
    ano: '',
  });

  const idUsuario = localStorage.getItem('idUsuario');

  useEffect(() => {
    if (!idUsuario) {
      alert('Você precisa estar logado para acessar essa página.');
      navigate('/');
      return;
    }

    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/api/veiculos/${idUsuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error('Erro ao buscar dados do veículo');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setFormData({
            marca: data.marca || '',
            modelo: data.modelo || '',
            cor: data.cor || '',
            placa: data.placa || '',
            ano: data.ano ? data.ano.toString() : '',
          });
        } else {
          setFormData({
            marca: '',
            modelo: '',
            cor: '',
            placa: '',
            ano: '',
          });
        }
      })
      .catch(error => {
        console.log('Veículo não encontrado ou erro na requisição:', error);
      });
  }, [idUsuario, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      ...formData,
      ano: formData.ano ? Number(formData.ano) : null,
    };

    fetch(`http://localhost:8080/api/veiculos/${idUsuario}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao salvar dados do veículo');
        }
        return response.text();
      })
      .then(msg => {
        alert(msg || 'Informações salvas com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao salvar informações do veículo:', error);
        alert('Erro ao salvar informações');
      });
  };

  return (
    <div className="info-carro-page">
      <header className="motorista-header">
        <div className="header-section">
          <button className="voltar-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
        </div>

        <div className="header-section logo-nome">
          <img src={logo} alt="Logo" className="logo-header" />
          <h2>FatecRide</h2>
        </div>

        <div className="header-section usuario-menu-container">
          <UserMenu />
        </div>
      </header>

      <div className="info-conteudo">
        <h1>Informações do Carro</h1>
        <form className="info-form" onSubmit={handleSubmit}>
          <label>
            Marca:
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              placeholder="Ex: Toyota"
            />
          </label>
          <label>
            Modelo:
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              placeholder="Ex: Corolla"
            />
          </label>
          <label>
            Cor:
            <input
              type="text"
              name="cor"
              value={formData.cor}
              onChange={handleChange}
              placeholder="Ex: Prata"
            />
          </label>
          <label>
            Placa:
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              placeholder="Ex: ABC-1234"
            />
          </label>
          <label>
            Ano:
            <input
              type="number"
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              placeholder="Ex: 2020"
            />
          </label>
          <button type="submit" className="salvar-btn">
            Salvar Informações
          </button>
        </form>
      </div>
    </div>
  );
};

export default InformacoesCarroPage;
