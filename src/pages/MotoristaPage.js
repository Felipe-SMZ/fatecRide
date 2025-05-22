import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import logo from '../assets/images/Logo.png';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import '../App.css';

const MotoristaPage = () => {
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);

    // Fecha o menu ao clicar fora
    useEffect(() => {
        const handleClickFora = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
        };
        document.addEventListener('mousedown', handleClickFora);
        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, []);

    const fecharMenuENavegar = (rota) => {
        setMenuAberto(false);
        navigate(rota);
    };

    return (
        <div className="motorista-page">
            <header className="motorista-header">
                <div className="header-section">
                    <button className="voltar-btn" onClick={() => navigate('/inicio')}>
                        <FaArrowLeft />
                    </button>
                </div>

                <div className="header-section logo-nome">
                    <img src={logo} alt="Logo" className="logo-header" />
                    <h2>FatecRide</h2>
                </div>

                <div className="header-section usuario-menu-container" ref={menuRef}>
                    <button
                        className="usuario-btn"
                        onClick={() => setMenuAberto(!menuAberto)}
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

            <div className="motorista-conteudo">
                <div className="mapa-container">
                    <MapContainer center={[-23.5617, -46.625]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                    </MapContainer>
                </div>
                <div className="formulario-container">
                    <h1>Para onde vamos?</h1>
                    <input type="text" placeholder="Ponto de Partida" />
                    <input type="text" placeholder="Ponto Final" />
                    <input type="number" placeholder="Vagas disponíveis" min="0" max="5" />
                    <button className="enviar-btn" onClick={() => navigate('/confirmarcarona')}>Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default MotoristaPage;
