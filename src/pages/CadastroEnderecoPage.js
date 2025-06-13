import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/CadastroEnderecoPage.css';
import Header from '../components/Header/Header.jsx';

const CadastroEnderecoPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const usuarioData = state?.usuarioData;
  const userTypeId = usuarioData?.userTypeId;

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(false);

  const [enderecoData, setEnderecoData] = useState({
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    cityId: null,
    stateId: null,
  });

  const limparTexto = (texto) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove acentuação
      .replace(/[^a-zA-Z0-9\s.-]/g, ''); // permite letras, números, espaço, ponto e hífen

  useEffect(() => {
    if (!usuarioData) {
      console.warn('Nenhum dado de usuário encontrado. Redirecionando...');
      navigate('/cadastro');
    }
  }, [usuarioData, navigate]);

  useEffect(() => {
    fetch('http://localhost:8080/states')
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .catch((err) => console.error('Erro ao buscar estados:', err));
  }, []);

  useEffect(() => {
    if (enderecoData.stateId) {
      fetch(`http://localhost:8080/cities/${enderecoData.stateId}`)
        .then((res) => res.json())
        .then((data) => setCidades(data))
        .catch((err) => console.error('Erro ao buscar cidades:', err));
    } else {
      setCidades([]);
      setEnderecoData((prev) => ({ ...prev, cidade: '', cityId: null }));
    }
  }, [enderecoData.stateId]);

  const buscarEnderecoPorCep = async (cep) => {
    try {
      const cepLimpo = cep.replace(/\D/g, '');
      if (cepLimpo.length !== 8) return;

      const response = await fetch(`http://localhost:8080/cep/${cepLimpo}`);
      if (!response.ok) throw new Error('CEP não encontrado');
      const data = await response.json();

      const estadoEncontrado = estados.find(
        (e) => e.uf.toLowerCase() === data.uf.toLowerCase()
      );
      let stateId = estadoEncontrado?.id || null;
      let cityId = null;

      if (stateId) {
        const cidadesRes = await fetch(`http://localhost:8080/cities/${stateId}`);
        const cidadesData = await cidadesRes.json();
        setCidades(cidadesData);
        const cidadeEncontrada = cidadesData.find(
          (c) => c.nome.toLowerCase() === data.localidade.toLowerCase()
        );
        if (cidadeEncontrada) cityId = cidadeEncontrada.id;
      }

      const cepFormatado = `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`;

      setEnderecoData((prev) => ({
        ...prev,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
        cep: cepFormatado,
        stateId,
        cityId,
      }));
    } catch (error) {
      alert(error.message);
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cep') {
      let cepLimpo = value.replace(/\D/g, '');
      if (cepLimpo.length > 8) cepLimpo = cepLimpo.slice(0, 8);

      const cepFormatado =
        cepLimpo.length > 5 ? `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}` : cepLimpo;

      setEnderecoData((prev) => ({ ...prev, cep: cepFormatado }));

      if (cepLimpo.length === 8) buscarEnderecoPorCep(cepLimpo);
      return;
    }

    if (name === 'estado') {
      const estadoSelecionado = estados.find((e) => e.uf === value);
      setEnderecoData((prev) => ({
        ...prev,
        estado: value,
        stateId: estadoSelecionado ? estadoSelecionado.id : null,
        cidade: '',
        cityId: null,
      }));
      return;
    }

    if (name === 'cidade') {
      const cidadeSelecionada = cidades.find((c) => c.nome === value);
      setEnderecoData((prev) => ({
        ...prev,
        cidade: value,
        cityId: cidadeSelecionada ? cidadeSelecionada.id : null,
      }));
      return;
    }

    const valorLimpo = ['logradouro', 'bairro', 'numero'].includes(name)
      ? limparTexto(value)
      : value;

    setEnderecoData((prev) => ({ ...prev, [name]: valorLimpo }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioData) {
      alert('Dados do usuário não encontrados.');
      return;
    }

    const enderecoLimpo = {
      cityId: enderecoData.cityId,
      logradouro: limparTexto(enderecoData.logradouro),
      numero: limparTexto(enderecoData.numero),
      bairro: limparTexto(enderecoData.bairro),
      cep: enderecoData.cep,
    };

    const userTypeIdNum = Number(usuarioData.userTypeId);

    if (userTypeIdNum === 1) {
      setLoading(true);

      const dadosCompletos = {
        ...usuarioData,
        userAddressesDTO: enderecoLimpo,
      };

      console.log('Dados a enviar no cadastro:', dadosCompletos);

      try {
        const response = await fetch('http://localhost:8080/users/criarPassageiro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosCompletos),
        });

        const responseBody = await response.text();

        if (!response.ok) throw new Error(`Erro ao cadastrar passageiro: ${responseBody}`);

        setLoading(false);
        navigate('/cadastro-concluido');

      } catch (error) {
        alert(`Erro no cadastro: ${error.message}`);
        setLoading(false);
      }
    } else {
      // Para motoristas, avança para cadastro de veículo com os dados coletados
      navigate('/cadastro-veiculo', {
        state: {
          usuarioData,
          enderecoData: enderecoLimpo,
        },
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="cadastro-endereco-page">
        <h2>Cadastro de Endereço</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="cep"
            placeholder="CEP"
            value={enderecoData.cep}
            onChange={handleChange}
            maxLength={9}
            required
          />
          <input
            name="logradouro"
            placeholder="Rua"
            value={enderecoData.logradouro}
            onChange={handleChange}
            required
          />
          <input
            name="numero"
            placeholder="Número"
            value={enderecoData.numero}
            onChange={handleChange}
            required
          />
          <input
            name="bairro"
            placeholder="Bairro"
            value={enderecoData.bairro}
            onChange={handleChange}
            required
          />
          <select
            name="estado"
            value={enderecoData.estado}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o estado</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.uf}>
                {estado.uf}
              </option>
            ))}
          </select>
          <select
            name="cidade"
            value={enderecoData.cidade}
            onChange={handleChange}
            required
            disabled={!enderecoData.stateId}
          >
            <option value="">Selecione a cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {userTypeId === 1 ? (loading ? 'Cadastrando...' : 'Cadastrar') : 'Avançar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroEnderecoPage;
