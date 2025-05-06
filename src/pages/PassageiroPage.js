import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import logo from '../assets/images/Logo.png';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import '../App.css';

const PassageiroPage = () => {
    const navigate = useNavigate();

    return (
        <div className="motorista-page">
            <header className="motorista-header">
                <button className="voltar-btn" onClick={() => navigate('/inicio')}>
                    <FaArrowLeft />
                </button>
                <div className="logo-nome">
                    <img src={logo} alt="Logo" className="logo-header" />
                    <h2>FatecRide</h2>
                </div>
                <button className="usuario-btn" onClick={() => navigate('/atualizar-cadastro')}>
                    <FaUser />
                </button>
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
                    <h1>Para onde você quer ir?</h1>
                    <input type="text" placeholder="Ponto de Partida" />
                    <input type="text" placeholder="Destino" />
                    <button className="enviar-btn" onClick={() => navigate('/caronas-disponiveis')}>
                        Buscar Caronas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PassageiroPage;
