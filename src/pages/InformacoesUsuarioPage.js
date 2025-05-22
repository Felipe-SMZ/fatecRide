import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEdit } from 'react-icons/fa';
import logo from '../assets/images/Logo.png';
import '../css/InformacoesUsuarioPage.css';

const InformacoesUsuarioPage = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const [nome, setNome] = useState('Guilherme Rufino');
  const [email, setEmail] = useState('gui8878787@gmail');
  const [telefone, setTelefone] = useState('(11) 999-9999');
  const [curso, setCurso] = useState('TI');

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const fecharMenuENavegar = (rota) => {
    setMenuAberto(false);
    navigate(rota);
  };

  const handleAtualizar = () => {
    alert('Informações atualizadas com sucesso!');
  };

  return (
    <div className="informacoes-usuario-page">
      <header className="passageiro-header">
        <div className="header-section">
          <button
            className="voltar-btn"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <FaArrowLeft />
          </button>
        </div>

        <div className="header-section">
          <div className="logo-nome">
            <img src={logo} alt="Logo" className="logo-header" />
            <h2>FatecRide</h2>
          </div>
        </div>

        <div
          className="header-section usuario-menu-container"
          style={{ position: 'relative' }}
        >
          <button
            className="usuario-btn"
            onClick={toggleMenu}
            aria-label="Menu do usuário"
          >
            <FaUser />
          </button>

          {menuAberto && (
            <div className="menu-suspenso">
              <button onClick={() => fecharMenuENavegar('/info-usuario')}>
                Informações do usuário
              </button>
              <button onClick={() => fecharMenuENavegar('/info-carro')}>
                Informações do carro
              </button>
              <button
                className="deletar-btn"
                onClick={() => {
                  setMenuAberto(false);
                  if (
                    window.confirm(
                      'Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.'
                    )
                  ) {
                    alert('Conta deletada com sucesso!');
                    navigate('/');
                  }
                }}
              >
                Deletar conta
              </button>
              <button
                onClick={() => {
                  setMenuAberto(false);
                  alert('Logout efetuado!');
                  navigate('/');
                }}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="usuario-conteudo">
        <h2>Informações</h2>

        {[
          { label: 'Nome', value: nome, setValue: setNome },
          { label: 'Email', value: email, setValue: setEmail },
          { label: 'Telefone', value: telefone, setValue: setTelefone },
          { label: 'Curso', value: curso, setValue: setCurso },
        ].map((item, index) => (
          <div className="campo-info" key={index}>
            <label>{item.label}:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={item.value}
                onChange={(e) => item.setValue(e.target.value)}
                style={{ flex: 1 }}
              />
              <FaEdit style={{ marginLeft: '10px', color: '#007bff' }} />
            </div>
          </div>
        ))}

        <button className="botao-principal" onClick={handleAtualizar}>
          Atualizar
        </button>
      </main>
    </div>
  );
};

export default InformacoesUsuarioPage;
