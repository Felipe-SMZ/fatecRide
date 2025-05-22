import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import logo from '../assets/images/Logo.png';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import '../App.css';

const PassageiroPage = () => {
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <div className="passageiro-page">
            <header className="passageiro-header">
                <div className="header-section">
                    <button
                        className="voltar-btn"
                        onClick={() => navigate('/inicio')}
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

                <div className="header-section usuario-menu-container" style={{ position: 'relative' }}>
                    <button
                        className="usuario-btn"
                        onClick={() => setMenuAberto(!menuAberto)}
                        aria-label="Menu do usuário"
                    >
                        <FaUser />
                    </button>

                    {menuAberto && (
                        <div className="menu-suspenso">
                            <button onClick={() => {
                                setMenuAberto(false);
                                navigate('/info-usuario');
                            }}>
                                Informações do usuário
                            </button>
                            <button onClick={() => {
                                setMenuAberto(false);
                                navigate('/info-carro');
                            }}>
                                Informações do carro
                            </button>
                            <button
                                className="deletar-btn"
                                onClick={() => {
                                    setMenuAberto(false);
                                    if (window.confirm('Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.')) {
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

            <div className="passageiro-conteudo">
                <div className="mapa-container">
                    <MapContainer
                        center={[-23.5617, -46.625]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                    </MapContainer>
                </div>
                <div className="formulario-container">
                    <h1>Para onde você quer ir?</h1>
                    <input type="text" placeholder="Ponto de Partida" />
                    <input type="text" placeholder="Destino" />
                    <button
                        className="enviar-btn"
                        onClick={() => navigate('/caronas-disponiveis')}
                    >
                        Buscar Caronas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PassageiroPage;
