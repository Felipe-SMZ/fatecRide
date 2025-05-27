import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../css/CadastroEnderecoPage.css';



const EnderecoPage = () => {
  const navigate = useNavigate();

  // Pega idUsuario do localStorage (armazenado após cadastro do usuário)
  const idUsuario = localStorage.getItem('id_usuario');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('ID do usuário:', idUsuario);
    const idUsuarioNum = Number(idUsuario);

    if (!idUsuario || isNaN(idUsuarioNum)) {
      alert('Usuário não identificado. Por favor, faça login ou cadastre-se novamente.');
      return;
    }

    const camposObrigatorios = ['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep'];
    const camposPreenchidos = camposObrigatorios.every(campo => endereco[campo]);

    if (!camposPreenchidos) {
      alert('Por favor, preencha todos os campos.');
      return;
    }


    try {
      const res = await fetch(`http://localhost:8080/api/enderecos/${idUsuarioNum}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(endereco)  // só os dados do endereço, sem objeto usuário
      });


      if (!res.ok) throw new Error('Erro ao cadastrar endereço');

      navigate('/cadastro-concluido');
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  };


  return (
    <div className="endereco-page">
      <header className="cabecalho">
        <img src={logo} alt="Logo FatecRide" className="logo" />
        <h1>Cadastro de Endereço</h1>
      </header>

      <form className="formulario-endereco" onSubmit={handleSubmit}>
        <label>Rua</label>
        <input type="text" name="rua" value={endereco.rua} onChange={handleChange} required />

        <label>Número</label>
        <input type="text" name="numero" value={endereco.numero} onChange={handleChange} required />

        <label>Bairro</label>
        <input type="text" name="bairro" value={endereco.bairro} onChange={handleChange} required />

        <label>Cidade</label>
        <input type="text" name="cidade" value={endereco.cidade} onChange={handleChange} required />

        <label>Estado</label>
        <select
          name="estado"
          value={endereco.estado}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um estado</option>
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>


        <label>CEP</label>
        <input type="text" name="cep" value={endereco.cep} onChange={handleChange} required />

        <button type="submit" className="botao-cadastrar">Cadastrar Endereço</button>
      </form>
    </div>
  );
};

export default EnderecoPage;
