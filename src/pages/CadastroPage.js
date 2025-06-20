import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/CadastroPage.css';
import Header from '../components/Header/Header.jsx';

const CadastroPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const incomingUserTypeId = location.state?.userTypeId;
  const userTypeIdNumber = typeof incomingUserTypeId === 'string'
    ? parseInt(incomingUserTypeId, 10)
    : incomingUserTypeId;

  const validUserTypeId = Number.isInteger(userTypeIdNumber) ? userTypeIdNumber : undefined;

  const [userTypeId, setUserTypeId] = useState(validUserTypeId);
  const [cursos, setCursos] = useState([]);
  const [genders, setGenders] = useState([]);

  const [usuarioData, setUsuarioData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    emailConfirmacao: '',
    senha: '',
    senhaConfirmacao: '',
    telefone: '',
    courseId: '',
    genderId: '',
    foto: ''
  });

  useEffect(() => {
    if (validUserTypeId !== undefined && validUserTypeId !== userTypeId) {
      setUserTypeId(validUserTypeId);
    }
  }, [validUserTypeId]);

  useEffect(() => {
    if (!userTypeId && location.state !== undefined) {
      console.warn('userTypeId inválido, redirecionando');
      navigate('/escolha-perfil');
    }
  }, [userTypeId, navigate, location.state]);

  useEffect(() => {
    fetch('http://localhost:8080/courses')
      .then(res => res.json())
      .then(data => setCursos(data))
      .catch(err => console.error('Erro ao buscar cursos:', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/genders')
      .then(res => res.json())
      .then(data => setGenders(data))
      .catch(err => console.error('Erro ao buscar gêneros:', err));
  }, []);

  if (!userTypeId) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuarioData.email !== usuarioData.emailConfirmacao) {
      alert('Os e-mails não coincidem!');
      return;
    }

    if (usuarioData.senha !== usuarioData.senhaConfirmacao) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!usuarioData.courseId || !usuarioData.genderId) {
      alert('Por favor, selecione o curso e o gênero.');
      return;
    }

    const dataToSend = {
      ...usuarioData,
      userTypeId,
    };

    navigate('/cadastro-endereco', {
      state: { usuarioData: dataToSend },
    });
  };

  return (
    <div>
      <Header />
      <div className="cadastro-page">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <input name="nome" placeholder="Nome" value={usuarioData.nome} onChange={handleChange} required />
          <input name="sobrenome" placeholder="Sobrenome" value={usuarioData.sobrenome} onChange={handleChange} required />
          
          <select name="courseId" value={usuarioData.courseId} onChange={handleChange} required>
            <option value="">Selecione o curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>{curso.name}</option>
            ))}
          </select>

          <select name="genderId" value={usuarioData.genderId} onChange={handleChange} required>
            <option value="">Selecione o gênero</option>
            {genders.map(gender => (
              <option key={gender.id} value={gender.id}>{gender.name}</option>
            ))}
          </select>

          <input name="telefone" placeholder="Telefone" value={usuarioData.telefone} onChange={handleChange} required />
          <input name="email" placeholder="E-mail" type="email" value={usuarioData.email} onChange={handleChange} required />
          <input name="emailConfirmacao" placeholder="Confirmar E-mail" type="email" value={usuarioData.emailConfirmacao} onChange={handleChange} required />
          <input name="senha" placeholder="Senha" type="password" value={usuarioData.senha} onChange={handleChange} required />
          <input name="senhaConfirmacao" placeholder="Confirmar Senha" type="password" value={usuarioData.senhaConfirmacao} onChange={handleChange} required />
          <button type="submit">Avançar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPage;
