import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // <-- Importar useLocation aqui
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/images/Logo.png';
import UserMenu from '../components/UserMenu/UserMenu';
import '../css/ConfirmarCaronaMotorista.css';

const ConfirmarCarona = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Pega os dados enviados pela navegação
    const { origem, destino, vagas } = location.state || {
        origem: '',
        destino: '',
        vagas: 0,
    };

    // Solicitações simuladas
    const [solicitacoes, setSolicitacoes] = useState([
        { id: 1, nome: 'João Silva', status: 'pendente' },
        { id: 2, nome: 'Maria Oliveira', status: 'pendente' },
        { id: 3, nome: 'Carlos Pereira', status: 'pendente' },
    ]);

    // Função para confirmar uma solicitação
    const confirmarSolicitacao = (id) => {
        setSolicitacoes((prev) =>
            prev.map((sol) =>
                sol.id === id ? { ...sol, status: 'confirmado' } : sol
            )
        );
    };

    return (
        <div className="confirmar-carona-page">
            {/* Header igual da MotoristaPage */}
            <header className="confirmar-carona-header">
                <div className="header-section">
                    <button
                        className="voltar-btn"
                        onClick={() => navigate('/motorista')}
                        aria-label="Voltar"
                    >
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

            <main className="confirmar-carona-conteudo">
                {/* Detalhes da carona - topo */}
                <section className="detalhes-carona">
                    <h1>Carona Criada</h1>
                    <div className="detalhes-info">
                        <p><strong>Origem:</strong> {origem}</p> {/* Usar origem direto */}
                        <p><strong>Destino:</strong> {destino}</p> {/* Usar destino direto */}
                        <p><strong>Vagas disponíveis:</strong> {vagas}</p> {/* Usar vagas direto */}
                    </div>
                </section>

                {/* Solicitações */}
                <section className="solicitacoes-container">
                    <h2>Solicitações</h2>
                    {solicitacoes.length === 0 && (
                        <p className="sem-solicitacoes">Nenhuma solicitação no momento.</p>
                    )}

                    {solicitacoes.map(({ id, nome, status }) => (
                        <div
                            key={id}
                            className={`solicitacao-card ${status === 'confirmado' ? 'confirmado-card' : 'pendente-card'}`}
                            tabIndex={0}
                            aria-label={`Solicitação de ${nome} está ${status}`}
                        >
                            <div className="solicitacao-info">
                                <strong>{nome}</strong>
                                <span className={`status-badge ${status === 'confirmado' ? 'confirmado' : 'pendente'}`}>
                                    {status}
                                </span>
                            </div>

                            {status === 'pendente' ? (
                                <button
                                    className="btn-confirmar"
                                    onClick={() => confirmarSolicitacao(id)}
                                >
                                    Confirmar
                                </button>
                            ) : (
                                <button className="btn-confirmado" disabled>
                                    Confirmado
                                </button>
                            )}
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default ConfirmarCarona;
