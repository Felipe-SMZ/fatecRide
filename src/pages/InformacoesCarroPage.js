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
    vagas_disponiveis: 0,
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
    fetchVeiculos(token);
  }, [navigate]);

  const fetchVeiculos = (token) => {
    fetch('http://localhost:8080/veiculos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao buscar veículos');
        return response.json();
      })
      .then((data) => {
        setVeiculos(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Erro ao buscar veículos:', error);
        setVeiculos([]);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado');
      return;
    }

    const payload = {
      modelo: formData.modelo,
      marca: formData.marca,
      placa: formData.placa,
      cor: formData.cor,
      ano: Number(formData.ano),
      vagas_disponiveis: formData.vagas_disponiveis ? Number(formData.vagas_disponiveis) : 0,
    };

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:8080/veiculos/${formData.id}`
      : 'http://localhost:8080/veiculos';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} veículo`);
        return res.json();
      })
      .then((data) => {
        alert(`Veículo ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);

        if (isEditing) {
          setVeiculos((prev) =>
            prev.map((v) => (v.id === data.id ? data : v))
          );
        } else {
          setVeiculos((prev) => [...prev, data]);
        }

        setFormData({
          id: '',
          marca: '',
          modelo: '',
          cor: '',
          placa: '',
          ano: '',
          vagas_disponiveis: 0,
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  const handleEdit = (veiculo) => {
    setFormData({
      id: veiculo.id,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      cor: veiculo.cor,
      placa: veiculo.placa,
      ano: veiculo.ano,
      vagas_disponiveis: veiculo.vagas_disponiveis || 0,
    });
    setIsEditing(true);
  };
 

  const handleDelete = (id) => {
    if (!window.confirm('Deseja realmente deletar este veículo?')) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado');
      return;
    }

    fetch(`http://localhost:8080/veiculos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(id);
        if (!res.ok) throw new Error('Erro ao deletar veículo');
        alert('Veículo deletado com sucesso!');
        setVeiculos((prev) => prev.filter((v) => v.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
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
                required
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
                required
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
                required
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
                required
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
                required
                min="1900"
                max={new Date().getFullYear()}
              />
            </label>
            <label>
              Vagas Disponíveis:
              <input
                type="number"
                name="vagas_disponiveis"
                value={formData.vagas_disponiveis}
                onChange={handleChange}
                min="0"
                max="10"
              />
            </label>
            <button type="submit" className="salvar-btn">
              {isEditing ? 'Atualizar Veículo' : 'Salvar Informações'}
            </button>
          </form>
        </div>

        <div className="veiculos-list">
          <h2>Meus Veículos</h2>
          {veiculos.length === 0 ? (
            <p>Nenhum veículo cadastrado.</p>
          ) : (
            <ul>
              {veiculos.map((veiculo) => (
                <li key={veiculo.id}>
                  {veiculo.marca} {veiculo.modelo} ({veiculo.ano}) - Vagas: {veiculo.vagas_disponiveis || 0}
                  <button onClick={() => handleEdit(veiculo)}>Editar</button>{' '}
                  <button onClick={() => handleDelete(veiculo.id)}>Deletar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformacoesCarroPage;
