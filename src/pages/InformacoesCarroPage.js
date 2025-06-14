import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderMenu from '../components/Header/HeaderMenu';
import '../css/InformacoesCarroPage.css';

const InformacoesCarroPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    marca: '',
    modelo: '',
    cor: '',
    placa: '',
    ano: '',
  });
  const [veiculos, setVeiculos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para acessar essa página.');
      navigate('/');
      return;
    }

    fetch('http://localhost:8080/veiculos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('🚗 Dados dos veículos recebidos:', data);
        setVeiculos(data);
      })
      .catch((error) => console.error('Erro ao buscar veículos:', error));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:8080/veiculos/${formData.id}`
      : 'http://localhost:8080/veiculos';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao salvar dados do veículo');
        }
        return response.json();
      })
      .then((data) => {
        alert('Informações salvas com sucesso!');
        setVeiculos((prev) =>
          isEditing
            ? prev.map((v) => (v.id === data.id ? data : v))
            : [...prev, data]
        );
        setFormData({
          id: '',
          marca: '',
          modelo: '',
          cor: '',
          placa: '',
          ano: '',
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Erro ao salvar informações do veículo:', error);
        alert('Erro ao salvar informações');
      });
  };

  const handleEdit = (veiculo) => {
    setFormData(veiculo);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    console.log('🗑️ Tentando deletar veículo com ID:', id);

    fetch(`http://localhost:8080/veiculos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao deletar veículo');
        }
        setVeiculos((prev) => prev.filter((veiculo) => veiculo.id !== id));
        alert('Veículo deletado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao deletar veículo:', error);
        alert('Erro ao deletar veículo');
      });
  };

  return (
    <div>
      <HeaderMenu />
      <div className="info-carro-page">
        <div className="info-conteudo">
          <h1>{isEditing ? 'Editar Veículo' : 'Adicionar Novo Veículo'}</h1>
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
              {isEditing ? 'Atualizar Veículo' : 'Salvar Informações'}
            </button>
          </form>
        </div>
        <div className="veiculos-list">
          <h2>Meus Veículos</h2>
          <ul>
            {veiculos.map((veiculo) => (
              <li key={veiculo.id}>
                {veiculo.marca} {veiculo.modelo} ({veiculo.ano})
                <button onClick={() => handleEdit(veiculo)}>Editar</button>
                <button onClick={() => handleDelete(veiculo.id)}>Deletar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformacoesCarroPage;
