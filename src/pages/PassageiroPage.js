import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import logo from '../assets/images/Logo.png';
import UserMenu from '../components/UserMenu/UserMenu';

import '../App.css';
import '../components/UserMenu/UserMenu.css';
import '../css/MotoristaPage.css'; // pode usar o mesmo CSS do MotoristaPage para manter identidade visual

// Corrige o caminho dos ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RoutingMachine = ({ pontoPartidaCoords, pontoFinalCoords }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (pontoPartidaCoords && pontoFinalCoords && map) {
      if (routingRef.current) {
        routingRef.current.getPlan().setWaypoints([]);
        routingRef.current.remove();
      }

      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(pontoPartidaCoords.lat, pontoPartidaCoords.lon),
          L.latLng(pontoFinalCoords.lat, pontoFinalCoords.lon),
        ],
        routeWhileDragging: false,
        show: false,
      }).addTo(map);
    }
  }, [pontoPartidaCoords, pontoFinalCoords, map]);

  return null;
};

const locaisSalvos = {
  "fatec cotia": { lat: -23.6009, lon: -46.8805 },
  "terminal cotia": { lat: -23.5889, lon: -46.8820 },
  "terminal vargem grande paulista": { lat: -23.6401, lon: -46.9376 },
  "terminal itapevi": { lat: -23.5447, lon: -46.9047 }
};

const PassageiroPage = () => {
  const navigate = useNavigate();
  const [pontoPartida, setPontoPartida] = useState('');
  const [pontoFinal, setPontoFinal] = useState('');

  const [pontoPartidaCoords, setPontoPartidaCoords] = useState(null);
  const [pontoFinalCoords, setPontoFinalCoords] = useState(null);

  const buscarCoordenadasLocaisSalvos = (local) => {
    const key = local.trim().toLowerCase();
    return locaisSalvos[key] || null;
  };

  const gerarRota = () => {
    const partidaCoords = buscarCoordenadasLocaisSalvos(pontoPartida);
    const finalCoords = buscarCoordenadasLocaisSalvos(pontoFinal);

    if (!partidaCoords) {
      alert('Ponto de partida inválido ou não cadastrado.');
      return;
    }
    if (!finalCoords) {
      alert('Ponto final inválido ou não cadastrado.');
      return;
    }

    setPontoPartidaCoords(partidaCoords);
    setPontoFinalCoords(finalCoords);
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
        <div className="header-section usuario-menu-container">
          <UserMenu />
        </div>
      </header>

      <div className="motorista-conteudo">
        <div className="mapa-container">
          <MapContainer center={[-23.6009, -46.8805]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {pontoPartidaCoords && (
              <Marker position={[pontoPartidaCoords.lat, pontoPartidaCoords.lon]}>
                <Popup>Ponto de Partida</Popup>
              </Marker>
            )}

            {pontoFinalCoords && (
              <Marker position={[pontoFinalCoords.lat, pontoFinalCoords.lon]}>
                <Popup>Ponto Final</Popup>
              </Marker>
            )}

            {pontoPartidaCoords && pontoFinalCoords && (
              <RoutingMachine
                pontoPartidaCoords={pontoPartidaCoords}
                pontoFinalCoords={pontoFinalCoords}
              />
            )}
          </MapContainer>
        </div>

        <div className="formulario-container">
          <h1>Para onde vamos?</h1>
          <input
            type="text"
            placeholder="Ponto de Partida (ex: Fatec Cotia)"
            value={pontoPartida}
            onChange={(e) => setPontoPartida(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ponto Final (ex: Avenida Paulista)"
            value={pontoFinal}
            onChange={(e) => setPontoFinal(e.target.value)}
          />
          <button className="gerar-rota-btn" onClick={gerarRota}>
            Gerar Rota
          </button>
          <button
            className="enviar-btn"
            onClick={() =>
              navigate('/confirmarcaronapassageiro', {
                state: {
                  origem: pontoPartida,
                  destino: pontoFinal,
                },
              })
            }
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassageiroPage;
