import React, { useEffect, useState } from 'react';
import HeaderMenu from '../components/Header/HeaderMenu';
import { FaUserAlt } from 'react-icons/fa';
import '../css/ConfirmarCaronaPassageiro.css';

const ConfirmarCaronaPassageiro = () => {
  const [solicitacao, setSolicitacao] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setErro('Token não encontrado.');
      return;
    }

    fetch('http://localhost:8080/solicitacao/pending', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar solicitação pendente');
        return res.json();
      })
      .then((data) => {
        console.log('Resposta da solicitação pendente:', data);
        setSolicitacao(data);
      })
      .catch((err) => {
        console.error('Erro ao carregar solicitação pendente:', err);
        setErro('Erro ao carregar informações da solicitação.');
      });
  }, []);

  const cancelarSolicitacao = async () => {
    if (!solicitacao?.id) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `http://localhost:8080/solicitacao/cancelar/${solicitacao.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Erro ao cancelar solicitação');
      alert('Solicitação cancelada com sucesso!');
      setSolicitacao(null);
    } catch (error) {
      console.error('Erro ao cancelar:', error);
      alert('Erro ao cancelar solicitação');
    }
  };

  if (erro) {
    return (
      <>
        <HeaderMenu />
        <p className="erro">{erro}</p>
      </>
    );
  }

  if (!solicitacao) {
    return (
      <>
        <HeaderMenu />
        <p>Carregando informações da solicitação...</p>
      </>
    );
  }

  return (
    <>
      <HeaderMenu />
      <div className="confirmar-carona-container">
        <h1 className="titulo-solicitacao">Solicitação de Carona Enviada!</h1>
        <div className="motorista-info">
          <div className="nome-motorista">
            <h2>{solicitacao.nomeMotorista}</h2>
          </div>
          <div className="foto-container">
            {solicitacao.foto ? (
              <img
                src={solicitacao.foto}
                alt="Foto do motorista"
                className="motorista-foto"
              />
            ) : (
              <FaUserAlt className="motorista-foto default-icon" />
            )}
          </div>
        </div>

        <p className={`status ${solicitacao.status}`}>
          {solicitacao.status === 'pendente'
            ? 'Aguardando confirmação do motorista...'
            : 'Solicitação Confirmada!'}
        </p>

        <div className="carona-detalhes">
          <p><strong>Origem:</strong> {solicitacao.originDTO.logradouro} - {solicitacao.originDTO.cidade}</p>
          <p><strong>Destino:</strong> {solicitacao.destinationDTO.logradouro} - {solicitacao.destinationDTO.cidade}</p>
          <p><strong>Status:</strong> {solicitacao.status}</p>
        </div>

        <button onClick={cancelarSolicitacao} className="cancelar-btn">
          Cancelar Solicitação
        </button>
      </div>
    </>
  );
};

export default ConfirmarCaronaPassageiro;
