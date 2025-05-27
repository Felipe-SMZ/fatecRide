import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import logo from '../assets/images/Logo.png';
import UserMenu from '../components/UserMenu/UserMenu';

import '../css/ConfirmarCaronaPassageiro.css';

const opcoesDeCarona = [
  {
    id: 1,
    motorista: 'João Silva',
    origem: 'Fatec Cotia',
    destino: 'Terminal Cotia',
    vagasDisponiveis: 2,
    horario: '08:00',
  },
  {
    id: 2,
    motorista: 'Maria Santos',
    origem: 'Terminal Vargem Grande',
    destino: 'Fatec Cotia',
    vagasDisponiveis: 1,
    horario: '08:30',
  },
  {
    id: 3,
    motorista: 'Carlos Oliveira',
    origem: 'Fatec Cotia',
    destino: 'Terminal Itapevi',
    vagasDisponiveis: 3,
    horario: '09:00',
  },
];

const ConfirmarCaronaPassageiro = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { origem, destino } = location.state || {};

  // Função para normalizar string: tira espaços e deixa minúscula
  const normalize = (str) => (str ? str.trim().toLowerCase() : '');

  const [caronaSolicitadaId, setCaronaSolicitadaId] = useState(null);

  const solicitarCarona = (opcao) => {
    setCaronaSolicitadaId(opcao.id);
  };

  // Filtra só as caronas cujo destino normalizado é igual ao destino do passageiro
  const opcoesFiltradas = opcoesDeCarona.filter(
    (opcao) => normalize(opcao.destino) === normalize(destino)
  );

  return (
    <div className="confirmar-passageiro-page">
      <header className="confirmar-passageiro-header">
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

      <main className="confirmar-passageiro-conteudo">
        <h1>Confirmar Carona</h1>
        <p><strong>Origem:</strong> {origem || 'Não informado'}</p>
        <p><strong>Destino:</strong> {destino || 'Não informado'}</p>

        <h2>Opções de Carona Disponíveis</h2>

        {opcoesFiltradas.length === 0 ? (
          <p>Nenhuma carona disponível para o destino informado.</p>
        ) : (
          <div className="lista-carona">
            {opcoesFiltradas.map((opcao) => (
              <div key={opcao.id} className="card-carona">
                <p><strong>Motorista:</strong> {opcao.motorista}</p>
                <p><strong>Origem:</strong> {opcao.origem}</p>
                <p><strong>Destino:</strong> {opcao.destino}</p>
                <p><strong>Vagas disponíveis:</strong> {opcao.vagasDisponiveis}</p>
                <p><strong>Horário:</strong> {opcao.horario}</p>
                <button
                  className={`solicitar-btn ${caronaSolicitadaId === opcao.id ? 'aguardando' : ''}`}
                  onClick={() => solicitarCarona(opcao)}
                  disabled={caronaSolicitadaId === opcao.id}
                >
                  {caronaSolicitadaId === opcao.id ? 'Aguardando resposta...' : 'Solicitar'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default ConfirmarCaronaPassageiro;