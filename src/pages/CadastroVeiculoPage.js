import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/CadastroVeiculoPage.css';
import Header from '../components/Header/Header';


const CadastroVeiculoPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const usuarioData = state?.usuarioData;
  const enderecoData = state?.enderecoData;


  useEffect(() => {
    if (
      !usuarioData ||
      !enderecoData ||
      (usuarioData.userTypeId !== 2 && usuarioData.userTypeId !== 3)
    ) {
      navigate('/cadastro', { replace: true });
    }
  }, [usuarioData, enderecoData, navigate]);


  const [veiculoData, setVeiculoData] = useState({
    marca: '',
    modelo: '',
    placa: '',
    cor: '',
    ano: '',
  });

  const [loading, setLoading] = useState(false);

  if (!usuarioData || (usuarioData.userTypeId !== 2 && usuarioData.userTypeId !== 3)) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculoData(prev => ({ ...prev, [name]: value.trim() }));
  };

  // Validação simples da placa: 7 caracteres, letras e números, formato brasileiro (pode adaptar)
  const validarPlaca = (placa) => {
    const placaLimpa = placa.replace(/\s+/g, '').toUpperCase();
    const regexPlaca = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/; // padrão Mercosul
    return regexPlaca.test(placaLimpa);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    if (veiculoData.ano < 1900 || veiculoData.ano > currentYear) {
      alert(`Ano inválido! Informe um ano entre 1900 e ${currentYear}.`);
      return;
    }

    if (!validarPlaca(veiculoData.placa)) {
      alert('Placa inválida! Informe uma placa no formato correto.');
      return;
    }

    setLoading(true);

    const dataToSend = {
      ...usuarioData,
      userAddressesDTO: enderecoData,
      vehicleDTO: {
        ...veiculoData,
        placa: veiculoData.placa.toUpperCase().replace(/\s+/g, ''), // formata placa
      },
    };

    try {
      console.log('Dados que serão enviados:', dataToSend);

      const response = await fetch('http://localhost:8080/users/criarMotorista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const err = await response.json();
        alert('Erro ao cadastrar: ' + (err.message || response.statusText));
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate('/cadastro-concluido');

    } catch (error) {
      alert('Erro na requisição: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="cadastro-veiculo-page">
        <h2>Cadastro de Veículo</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="marca"
              placeholder="Marca"
              value={veiculoData.marca}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            <input
              type="text"
              name="modelo"
              placeholder="Modelo"
              value={veiculoData.modelo}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            <input
              type="text"
              name="placa"
              placeholder="Placa (ex: ABC1D23)"
              value={veiculoData.placa}
              onChange={handleChange}
              required
              maxLength={7}
            />
          </label>
          <br />

          <label>
            <input
              type="text"
              name="cor"
              placeholder="Cor"
              value={veiculoData.cor}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            <input
              type="number"
              name="ano"
              placeholder="Ano"
              value={veiculoData.ano}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear()}
            />
          </label>
          <br />

          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Concluir Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroVeiculoPage;
