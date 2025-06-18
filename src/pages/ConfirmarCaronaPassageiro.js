import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderMenu from '../components/Header/HeaderMenu'; // ajuste o caminho
import '../css/ConfirmarCaronaPassageiro.css';

const ConfirmarCaronaPassageiro = () => {
  const { state } = useLocation();
  const { caronaSelecionada, solicitacao, statusConfirmacao = 'pendente' } = state || {};

  if (!caronaSelecionada || !solicitacao) {
    return <p>Informações da solicitação não encontradas.</p>;
  }

  const {
    nome = 'Motorista',
    sobrenome = '',
    logradouroOrigem = 'Origem não informada',
    cidadeOrigem = '',
    logradouroDestino = 'Destino não informado',
    cidadeDestino = '',
    vagasDisponiveis = 'N/A',
  } = caronaSelecionada;

  return (
    <>
      <HeaderMenu />
      <div className="confirmar-carona-container">
        <h2>Solicitação de Carona Enviada!</h2>
        <p className={`status ${statusConfirmacao}`}>
          {statusConfirmacao === 'pendente' ? 'Aguardando confirmação do motorista...' : 'Solicitação Confirmada!'}
        </p>

        <div className="carona-detalhes">
          <p><strong>Motorista:</strong> {nome} {sobrenome}</p>
          <p><strong>Origem:</strong> {logradouroOrigem} - {cidadeOrigem}</p>
          <p><strong>Destino:</strong> {logradouroDestino} - {cidadeDestino}</p>
          <p><strong>Vagas Disponíveis:</strong> {vagasDisponiveis}</p>
          <p><strong>ID da Solicitação:</strong> {solicitacao.id ?? 'Não disponível'}</p>
        </div>
      </div>
    </>
  );
};

export default ConfirmarCaronaPassageiro;
