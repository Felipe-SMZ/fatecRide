import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../css/ConfirmarCaronaMotorista.css';
import HeaderMenu from '../components/Header/HeaderMenu.jsx';

const ConfirmarCarona = () => {
    const navigate = useNavigate();
    const [carona, setCarona] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');
    const [cancelando, setCancelando] = useState(false);

    const buscarCaronaAtiva = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('[DEBUG] Token:', token);

            const response = await fetch('http://localhost:8080/rides/corridasAtivas', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('[DEBUG] Status da resposta:', response.status);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('[DEBUG] Erro na resposta:', errorText);
                throw new Error(errorText || 'Erro ao buscar carona ativa');
            }

            const data = await response.json();
            console.log('[DEBUG] Dados recebidos:', data);

            if (Array.isArray(data) && data.length > 0) {
                setCarona(data[0]);
            } else {
                setErro('Nenhuma carona ativa encontrada.');
            }
        } catch (error) {
            console.error('Erro ao buscar carona ativa:', error);
            setErro('Erro ao buscar carona ativa.');
        } finally {
            setLoading(false);
        }
    };

    const cancelarCarona = async () => {
        const idDaCarona = carona?.id;
        if (!idDaCarona) {
            alert('ID da carona inválido.');
            return;
        }

        if (!window.confirm('Deseja realmente cancelar a carona?')) return;

        try {
            setCancelando(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/rides/cancelar/${idDaCarona}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('[DEBUG] Status do cancelamento:', response.status);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('[DEBUG] Erro no cancelamento:', errorText);
                throw new Error(errorText || 'Erro ao cancelar carona');
            }

            alert('Carona cancelada com sucesso!');
            setCarona(null);
        } catch (error) {
            console.error('Erro ao cancelar carona:', error);
            alert('Erro ao cancelar carona. Veja o console para detalhes.');
        } finally {
            setCancelando(false);
        }
    };

    useEffect(() => {
        buscarCaronaAtiva();
    }, []);

    return (
        <div className="confirmar-carona-page">
            <HeaderMenu />

            <main className="confirmar-carona-conteudo">
                <button className="voltar-btn" onClick={() => navigate(-1)} aria-label="Voltar">
                    <FaArrowLeft /> Voltar
                </button>

                {loading ? (
                    <p className="info-msg">Carregando carona ativa...</p>
                ) : erro ? (
                    <p className="erro-msg">{erro}</p>
                ) : carona ? (
                    <section className="detalhes-carona">
                        <h1>Carona Ativa</h1>
                        <div className="detalhes-info">
                            <p>
                                <strong>Origem:</strong>{' '}
                                {carona.origin?.logradouro || 'N/A'}, {carona.origin?.numero || '-'}
                            </p>
                            <p>
                                <strong>Destino:</strong>{' '}
                                {carona.destination?.logradouro || 'N/A'}, {carona.destination?.numero || '-'}
                            </p>
                            <p>
                                <strong>Vagas disponíveis:</strong> {carona.vagas_disponiveis || 0}
                            </p>
                            <p>
                                <strong>Status:</strong> {carona.status || 'Desconhecido'}
                            </p>
                        </div>
                        <button
                            className="btn-cancelar"
                            onClick={cancelarCarona}
                            disabled={cancelando}
                        >
                            {cancelando ? 'Cancelando...' : 'Cancelar Carona'}
                        </button>
                    </section>
                ) : (
                    <p className="info-msg">Nenhuma carona ativa no momento.</p>
                )}
            </main>
        </div>
    );
};

export default ConfirmarCarona;
